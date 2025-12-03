"use client";

import { Button } from "@/components/buttons";
import List from "./components/list";
import { Modal, ModalBody } from "@/components/modal";
import { FormEvent, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Form } from "@/components/form";
import IdpForm from "./idpForm";
import { toaster } from "@/components/toaster";
import { useRouter } from "next/navigation";

type Items = {
  items: Array<{
    id: string;
    name: string;
    description: string;
    endpoint: string;
    protocol: string;
    audience: string;
    groups_claim: string;
  }>;
};

export default function IdpList(props: Readonly<Items>) {
  const router = useRouter();
  const { items } = props;

  const [showIdpModal, setShowIdpModal] = useState(false);

  const createIdentityProvider = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
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

    try {
      const apiResponse = await fetch("/api/ssr/idps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const jsonResponse = await apiResponse.json();

      if (jsonResponse.id) {
        setShowIdpModal(false);
        router.refresh();
        toaster.success("IDP created successfully");
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
      <List items={items} />
      <div className="fixed right-0 bottom-0 flex items-center justify-center px-4 py-8">
        <Button
          className="btn btn-primary clickable w-full rounded-full p-6 text-xl font-bold uppercase shadow-[-3px_3px_8px_rgba(0,0,0,0.1)] md:w-3/4 lg:fixed lg:right-12 lg:bottom-12 lg:w-auto"
          onClick={() => setShowIdpModal(true)}
        >
          <PlusIcon className="size-7" />
          <div className="hidden md:inline">&nbsp;Create IDP</div>
        </Button>
      </div>
      <Modal
        show={showIdpModal}
        onClose={() => {
          setShowIdpModal(false);
        }}
        title={
          <div className="flex items-center">
            <PlusIcon className="size-8" />
            &nbsp;New Identity Provider
          </div>
        }
      >
        <ModalBody>
          <Form onSubmit={createIdentityProvider}>
            <IdpForm />
            <div className="flex w-full justify-between pt-4">
              <Button
                className="btn btn-bold btn-danger"
                onClick={() => {
                  setShowIdpModal(false);
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
