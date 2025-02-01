import { QueryParams } from '@repo/interfaces';

interface Note {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  noteId: number;
  systemContextTypeId: number;
  systemContextId: number;
  authorId: number;
  content: string;
  isPrivate: boolean;
  parentId: number;
  dateCreated: string;
  notePriorityId: number;
}

interface GetAllNotesQueryParams extends QueryParams {
  systemContextTypeId: number;
  systemContextIds: number[];
}

interface CreateNotePayload {
  systemContextTypeId: number;
  systemContextId: number;
  authorId: number;
  content: string;
  isPrivate: boolean;
  parentId: number;
  notePriorityId: number;
  createdBy: string;
}

interface GetAllPinnedNotesQueryParams extends QueryParams {
  userId: number;
}

export type {
  CreateNotePayload,
  GetAllNotesQueryParams,
  GetAllPinnedNotesQueryParams,
  Note,
};
