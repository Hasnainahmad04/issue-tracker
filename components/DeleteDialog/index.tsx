'use client';

import type { Issue } from '@prisma/client';
import type { ReactNode } from 'react';
import React from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '../ui/button';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  loading: boolean;
  issue: Issue;
  title: ReactNode;
};
const DeleteDialog = ({
  issue,
  loading,
  onDelete,
  onOpenChange,
  open,
  title,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger className="p-2" asChild>
        {title}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <b>{issue.title}</b> {' ?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={onDelete}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
