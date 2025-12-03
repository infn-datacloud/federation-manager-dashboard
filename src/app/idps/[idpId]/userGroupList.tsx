// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2
"use client";

import { InboxIcon, UserGroupIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "@/components/buttons";
import { useParams, useRouter } from "next/navigation";
import { Modal } from "@/components/modal/modal";
import { FormEvent, useState } from "react";
import { ModalBody } from "@/components/modal";
import { Form } from "@/components/form";
import UserGroupForm from "./userGroupForm";
import { toaster } from "@/components/toaster";

type ListProps = {
  items: Array<{
    id: string;
    name: string;
    description: string;
  }>;
};

export default function UserGroupsList(props: Readonly<ListProps>) {
  const router = useRouter();
  const { items } = props;

  const params = useParams();
  const idpId = params.idpId as string;

  const [showUserGroupModal, setShowUserGroupModal] = useState(false);

  const listItems = items?.map(item => (
    <Link
      href={`/idps/${idpId}/user-groups/${item.id}`}
      className="box clickable flex w-full cursor-pointer flex-col"
      key={item.id}
    >
      <h3 className="truncate font-black">{item.name}</h3>
      <div className="mt-1 line-clamp-2 text-sm opacity-80">
        {item.description}
      </div>
    </Link>
  ));

  const createUserGroup = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    // Prevent the default form submission (page reload)
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());

    const body: Record<string, unknown> = { ...entries };

    try {
      const apiResponse = await fetch(`/api/ssr/idps/${idpId}/user-groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const jsonResponse = await apiResponse.json();

      if (jsonResponse.id) {
        setShowUserGroupModal(false);
        router.refresh();
        toaster.success("User group created successfully");
      }

      //PrintFormErrors(jsonResponse);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      return;
    }
  };

  return (
    <>
      <div className="md: mt-12 flex flex-col justify-between md:flex-row">
        <div className="flex items-center text-xl font-bold uppercase">
          <UserGroupIcon className="size-6" />
          &nbsp;User Groups
        </div>
        <Button
          className="btn btn-secondary mt-4 md:mt-0"
          onClick={() => {
            setShowUserGroupModal(true);
          }}
        >
          <PlusIcon className="size-4" />
          Add user group
        </Button>
      </div>
      {!items || items.length == 0 ? (
        <div className="flex flex-col items-center pt-24 opacity-80">
          <InboxIcon className="size-24 opacity-50" />
          <h2 className="py-4 text-center">No user groups found</h2>
          <p className="w-2/3 text-center">
            Nothing to display at the moment. As soon as items are added, they
            will be listed here for you to view and manage.
          </p>
        </div>
      ) : (
        listItems
      )}
      <Modal
        show={showUserGroupModal}
        onClose={() => {
          setShowUserGroupModal(false);
        }}
        title={
          <div className="flex items-center">
            <UserGroupIcon className="size-6" />
            &nbsp;New User Group
          </div>
        }
      >
        <ModalBody>
          <Form onSubmit={createUserGroup}>
            <UserGroupForm />
            <div className="flex w-full justify-between pt-4">
              <Button
                className="btn btn-bold btn-danger"
                onClick={() => {
                  setShowUserGroupModal(false);
                }}
              >
                Cancel
              </Button>
              <Button className="btn btn-bold btn-primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
