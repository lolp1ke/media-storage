import { useBucket } from "@/hooks/bucket/useBucket";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
	DialogContent,
} from "@/components/ui/dialog";

import { FileIcon, FolderIcon, FolderTreeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useObject } from "@/hooks/object/useObject";
import { RedirectType, redirect } from "next/navigation";

interface Params {
	params: {
		readonly bucket: string;
	};
}

export default async function page({ params }: Params) {
	const bucket = await useBucket().get<string>(params.bucket);

	return (
		<main className={"flex flex-col gap-4 p-4 m-4"}>
			<section className={"flex gap-2 items-center justify-between"}>
				<article className={"flex items-center gap-2"}>
					<FolderTreeIcon />
					<h2>{bucket.name}</h2>
				</article>
				<div className={"flex items-center gap-2"}>
					<Dialog>
						<DialogTrigger asChild={true}>
							<Button type={"button"} className={"flex items-center gap-2"}>
								<FileIcon />
								Upload
							</Button>
						</DialogTrigger>
						<DialogContent>
							<form
								className={"flex flex-col gap-4"}
								action={async (formData: FormData) => {
									"use server";
									formData.append("bucket", bucket.name);

									await useObject()
										.upload(formData)
										.then(() => {});
								}}>
								<DialogHeader className={"flex flex-col items-start gap-2"}>
									<article>
										<DialogTitle>File details</DialogTitle>
									</article>
									<Input name={"file"} id={"file"} type={"file"} required={true} />
									<Input
										name={"name"}
										id={"name"}
										type={"text"}
										placeholder={"File name"}
										required={true}
									/>
									<Input name={"path"} id={"path"} type={"text"} placeholder={"Path to the file"} />
								</DialogHeader>
								<DialogFooter>
									<Button type={"submit"}>Upload</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger asChild={true}>
							<Button type={"button"} className={"flex items-center gap-2"} variant={"secondary"}>
								<FolderIcon />
								Folder
							</Button>
						</DialogTrigger>
						<DialogContent>
							<form
								className={"flex flex-col gap-4"}
								action={async (formData: FormData) => {
									"use server";

									const name = formData.get("name") as string;

									if (!name) return;
								}}>
								<DialogHeader className={"flex flex-col items-start gap-2"}>
									<article>
										<DialogTitle>Folder name</DialogTitle>
									</article>
									<Input
										name={"name"}
										id={"name"}
										type={"text"}
										placeholder={"Folder name"}
										required={true}
									/>
								</DialogHeader>
								<DialogFooter>
									<Button type={"submit"}>Create</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</section>
		</main>
	);
}
