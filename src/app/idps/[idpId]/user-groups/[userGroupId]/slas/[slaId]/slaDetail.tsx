// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { Modal, ModalBody } from "@/components/modal";
import { Form } from "@/components/form";
import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import SlaForm from "../../slaForm";
import { useParams, useRouter } from "next/navigation";
import { toaster } from "@/components/toaster";

type ItemProps = {
  item: {
    id: string;
    name: string;
    description: string;
    url: string;
    start_date: string;
    end_date: string;
  };
};

export default function SlaDetail(props: Readonly<ItemProps>) {
  const { item } = props;

  const router = useRouter();

  const params = useParams();
  const { idpId, userGroupId, slaId } = params;

  const [showSlaModal, setShowSlaModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteSla = async (): Promise<void> => {
    const apiResponse = await fetch(
      `/api/ssr/idps/${idpId}/user-groups/${userGroupId}/slas/${slaId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (apiResponse.ok) {
      setShowDeleteModal(false);
      router.push(`/idps/${idpId}/user-groups/${userGroupId}`);
      toaster.success("Sla deleted successfully");
    } else {
      const msg = await apiResponse.text();
      toaster.error("Error deleting Sla", msg);
      console.error("API Error:", msg);
    }
  };

  const updateSla = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    // Prevent the default form submission (page reload)
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());

    const body: Record<string, unknown> = { ...entries };

    for (const key in body) {
      const value = body[key];
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            body[key] = parsed;
          }
        } catch {
          // ignore invalid JSON
        }
      }
    }

    const apiResponse = await fetch(
      `/api/ssr/idps/${idpId}/user-groups/${userGroupId}/slas/${slaId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (apiResponse.ok) {
      setShowSlaModal(false);
      router.refresh();
      toaster.success("Sla updated successfully");
    } else {
      const msg = await apiResponse.text();
      toaster.error("Update failed", msg);
      console.error("API Error:", msg);
    }
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <Button
          className="btn btn-secondary w-full md:w-1/2"
          onClick={() => {
            setShowSlaModal(true);
          }}
        >
          <PencilIcon className="size-4" />
          Details
        </Button>
        <Button
          className="btn btn-danger w-full md:w-1/2"
          onClick={() => {
            setShowDeleteModal(true);
          }}
        >
          <TrashIcon className="size-4" />
          Delete
        </Button>
      </div>

      {/* Details Modal */}
      <Modal
        show={showSlaModal}
        onClose={() => {
          setShowSlaModal(false);
        }}
        title={
          <div className="flex items-center">
            <PencilIcon className="size-8" />
            &nbsp;Edit SLA
          </div>
        }
      >
        <ModalBody>
          <Form onSubmit={updateSla}>
            <SlaForm item={item} />
            <div className="flex w-full justify-between pt-4">
              <Button
                className="btn btn-bold btn-danger"
                onClick={() => {
                  setShowSlaModal(false);
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

      {/* Delete Modal */}
      <ConfirmModal
        onConfirm={() => {
          deleteSla();
        }}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        confirmButtonText="Yes, delete"
        cancelButtonText="Cancel"
        show={showDeleteModal}
        title={`Delete ${item.name}`}
        danger={true}
      >
        <p>
          Are you sure you want to delete the <b>{item.name}</b> SLA? This
          action is irreversible and you will not be able to retrieve your SLA
          anymore.
        </p>
      </ConfirmModal>
    </>
  );
}
