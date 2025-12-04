"use client";

import { Button } from "@/components/buttons";
import List from "./components/list";
import { Modal, ModalBody } from "@/components/modal";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import ProviderForm from "./providerForm";
import { Form } from "@/components/form";
import { toaster } from "@/components/toaster";
import { useRouter } from "next/navigation";

type ProviderListProps = {
  items: Array<{
    id: string;
    name: string;
    description: string;
    auth_url?: string;
    is_public?: boolean;
    provider_type?: string;
    image_tags?: Array<string>;
    network_tags?: Array<string>;
    support_emails?: Array<string>;
    site_admins?: Array<string>;
    status: string;
    user_name: string;
    site_tester_name: string;
    href: string;
  }>;
  userId: string;
  userRoles: Array<string>;
};

export default function ProviderList(props: Readonly<ProviderListProps>) {
  const router = useRouter();
  const { items, userId, userRoles } = props;

  const [showProviderModal, setShowProviderModal] = useState(false);

  const createProvider = async (formData: FormData) => {
    const body = JSON.stringify({
      name: formData.get("name"),
      description: formData.get("description"),
      auth_endpoint: formData.get("auth_endpoint"),
      is_public: formData.get("is_public"),
      type: formData.get("type[id]"),
      rally_username: formData.get("rally_username"),
      rally_password: formData.get("rally_password"),
      test_flavor_name: formData.get("test_flavor_name"),
      test_network_id: formData.get("test_network_id"),
      floating_ips_enable: formData.get("floating_ips_enable"),
      image_tags: formData.getAll("image_tags"),
      network_tags: formData.getAll("network_tags"),
      support_emails: formData.getAll("support_emails"),
      site_admins: formData.getAll("site_admins"),
    });

    const response = await fetch("/api/ssr/providers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (response.ok) {
      setShowProviderModal(false);
      router.refresh();
      toaster.success("Provider created successfully");
    } else {
      const msg = await response.text();
      console.error("API Error:", msg);
      toaster.error("Failed to create provider", msg);
    }
  };

  if (!userRoles.includes("admin") && !userRoles.includes("site-admin")) {
    return <List items={items} />;
  }

  return (
    <>
      <List items={items} />
      <>
        <div className="fixed right-0 bottom-0 flex items-center justify-center px-4 py-8 md:w-full">
          <Button
            className="btn btn-primary clickable w-full rounded-full p-6 text-xl font-bold uppercase shadow-[-3px_3px_8px_rgba(0,0,0,0.1)] md:w-3/4 lg:fixed lg:right-12 lg:bottom-12 lg:w-auto"
            onClick={() => setShowProviderModal(true)}
          >
            <PlusIcon className="size-7" />
            <div className="hidden md:inline">&nbsp;Create Provider</div>
          </Button>
        </div>
        <Modal
          show={showProviderModal}
          onClose={() => {
            setShowProviderModal(false);
          }}
          title={
            <div className="flex items-center">
              <PlusIcon className="size-8" />
              &nbsp;Create New Provider
            </div>
          }
        >
          <ModalBody>
            <Form action={createProvider}>
              <ProviderForm userId={userId} />
              <div className="flex w-full justify-between pt-4">
                <Button
                  className="btn btn-bold btn-danger"
                  onClick={() => {
                    setShowProviderModal(false);
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
    </>
  );
}
