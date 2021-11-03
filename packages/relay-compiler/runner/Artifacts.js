/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

// flowlint ambiguous-object-type:error

'use strict';

import type CodegenDirectory, {Filesystem} from '../codegen/CodegenDirectory';
import type {SourceChanges} from './Sources';
import type {ExecutableDefinitionNode} from 'graphql';

const {getName} = require('./GraphQLASTUtils');
const crypto = require('crypto');
const nullthrows = require('nullthrows');

type Filename = string;

type NodeName = string;

type FileSha1Hex = string;

type ArtifactFiles = Set<Filename>;

type ArtifactsMetadata = Map<Filename, FileSha1Hex>;

export type ArtifactMap = {|
  // Map nodeName to the set of artifacts for this node
  +artifacts: Map<NodeName, ArtifactFiles>,
  // Artifacts metadata (for now it's just sha1 of the file)
  +metadata: ArtifactsMetadata,
|};

export type ArtifactState = ArtifactMap;

export type SerializedArtifactState = $ReadOnlyArray<
  [string, $ReadOnlyArray<[string, string]>],
>;

function createEmptyState(): ArtifactState {
  return {
    artifacts: new Map(),
    metadata: new Map(),
  };
}

function serializeState(state: ArtifactState): SerializedArtifactState {
  const json = [];
  for (const [name, artifacts] of state.artifacts) {
    json.push([
      name,
      Array.from(artifacts).map(filename => {
        return [filename, state.metadata.get(filename) ?? ''];
      }),
    ]);
  }
  return json;
}

function deserializeState(json: SerializedArtifactState): ArtifactState {
  const metadata = new Map();
  const artifacts = new Map();
  json.forEach(([name, artifactArray]) => {
    const artifactsFiles = new Set();
    artifactArray.forEach(([filename, sha1hex]) => {
      artifactsFiles.add(filename);
      metadata.set(filename, sha1hex);
    });
    artifacts.set(name, artifactsFiles);
  });
  return {
    artifacts,
    metadata,
  };
}

function updateState(
  state: ArtifactState,
  changes: SourceChanges<ExecutableDefinitionNode>,
  generatedArtifacts: ArtifactMap,
  filesystem: Filesystem,
  resolveFullPath: (relativeFilePath: string) => string,
): ArtifactState {
  const nextState = {
    artifacts: new Map(state.artifacts),
    metadata: new Map(state.metadata),
  };
  const deletionCandidates = new Set();

  const addedNames = new Set();
  for (const {ast} of changes.added) {
    addedNames.add(getName(ast));
  }

  // For every removed AST node, delete the generated artifacts tracked for that
  // node, unless the AST node was also added when the file was moved or the
  // AST changed which shows up as added and removed in changes.
  for (const {ast} of changes.removed) {
    const name = getName(ast);

    if (addedNames.has(name)) {
      // Update, we deal with that when iterating the added nodes.
      continue;
    }
    const entry = nextState.artifacts.get(name);
    if (entry == null) {
      // No existing artifacts to delete
      continue;
    }
    for (const outdatedFile of entry.keys()) {
      deletionCandidates.add(outdatedFile);
    }
    nextState.artifacts.delete(name);
  }

  for (const [name, artifacts] of generatedArtifacts.artifacts) {
    const oldEntry = nextState.artifacts.get(name);
    if (oldEntry != null) {
      for (const outdatedFile of oldEntry) {
        if (!artifacts.has(outdatedFile)) {
          deletionCandidates.add(outdatedFile);
        }
      }
    }
    nextState.artifacts.set(name, artifacts);
    for (const filename of artifacts.keys()) {
      nextState.metadata.set(
        filename,
        generatedArtifacts.metadata.get(filename) ?? '',
      );
    }
  }

  if (deletionCandidates.size === 0) {
    return nextState;
  }

  const nextGeneratedArtifacts = new Set();
  for (const [, artifact] of eachNameAndArtifact(nextState)) {
    nextGeneratedArtifacts.add(artifact);
  }
  for (const candidate of deletionCandidates) {
    const someoneElseArtifact = nextGeneratedArtifacts.has(candidate);
    if (someoneElseArtifact) {
      // Sometimes, there are artifacts that are generated by multiple files
      // If this candidate is also generated by someone else in
      // artifact map, we just skip it here
      continue;
    }

    const candidatePath = resolveFullPath(candidate);
    if (filesystem.existsSync(candidatePath)) {
      filesystem.unlinkSync(candidatePath);
      nextState.metadata.delete(candidate);
    }
  }

  return nextState;
}

function producedFiles(
  dirs: $ReadOnlyArray<{|
    baseDir: string,
    dir: CodegenDirectory,
  |}>,
  artifactsMetadata: ArtifactsMetadata,
): ArtifactsMetadata {
  const result = new Map();
  dirs.forEach(({baseDir, dir}) => {
    const {deleted, updated, created, unchanged} = dir.changes;
    if (deleted.length > 0) {
      throw new Error('Did not expect to see a deletion entry here.');
    }
    [...updated, ...created].forEach(filename => {
      const name = dir.getPath(filename).substr(baseDir.length + 1);
      const sha1hex = sha1(nullthrows(dir.read(filename)));
      result.set(name, sha1hex);
    });
    unchanged.forEach(filename => {
      const name = dir.getPath(filename).substr(baseDir.length + 1);
      const sha1hex = artifactsMetadata.get(name);
      result.set(name, sha1hex ?? sha1(nullthrows(dir.read(filename))));
    });
  });
  return result;
}

function* eachNameAndArtifact(
  artifacts: ArtifactState,
): Iterator<[string, string]> {
  for (const [name, artifactsForSource] of artifacts.artifacts) {
    for (const artifactFile of artifactsForSource.keys()) {
      yield [name, artifactFile];
    }
  }
}

function sha1(content: string): string {
  return crypto.createHash('sha1').update(content).digest('hex');
}

module.exports = {
  createEmptyState,
  serializeState,
  deserializeState,
  updateState,
  producedFiles,
  eachNameAndArtifact,
};
