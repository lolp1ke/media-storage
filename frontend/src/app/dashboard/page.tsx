import { RedirectType, redirect } from "next/navigation";
import Link from "next/link";

import { useBucket } from "@/hooks/bucket/useBucket";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderTreeIcon, LayoutDashboardIcon } from "lucide-react";

export default async function page() {
	const buckets = await useBucket().get();

	function showDate(date: Date) {
		return new Date(date).toLocaleString("en-US", {
			hour12: true,
			hour: "2-digit",
			minute: "2-digit",
			year: "2-digit",
			month: "2-digit",
			day: "2-digit",
			timeZone: "Asia/Almaty",
		});
	}

	return (
		<main
			className={
				"flex flex-col flex-1 gap-2 p-4 m-2 outline outline-1 rounded-md outline-purple-700"
			}>
			<section className={"flex items-center justify-between gap-4 p-4"}>
				<div className={"flex items-center gap-2"}>
					<LayoutDashboardIcon />
					<h1>Dashboard</h1>
				</div>

				<Dialog>
					<DialogTrigger asChild={true}>
						<Button type={"button"} className={"flex gap-2 items-center"}>
							<FolderTreeIcon />
							<p className={"text-base font-semibold leading-none tracking-tight"}>Create bucket</p>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<form
							action={async (formData: FormData) => {
								"use server";
								const name = formData.get("name") as string;
								const isPublic = formData.get("isPublic") as string | null;

								if (!name) return;

								await useBucket()
									.create(name, !!isPublic)
									.then(() => {
										return redirect(`/dashboard/${name}`, RedirectType.push);
									});
							}}>
							<DialogHeader className={"flex flex-col gap-4"}>
								<article className={"flex flex-col gap-2"}>
									<DialogTitle>Create a new bucket</DialogTitle>
									<DialogDescription>Enter some meaningful name</DialogDescription>
								</article>
								<div className={"flex flex-col gap-4"}>
									<Input
										name={"name"}
										id={"name"}
										type={"text"}
										placeholder={"name"}
										required={true}
									/>
									<div className={"relative flex items-center gap-2"}>
										<Label>Public?</Label>
										<Input
											name={"isPublic"}
											id={"isPublic"}
											type={"checkbox"}
											className={
												"h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
											}
										/>
									</div>
								</div>
							</DialogHeader>
							<DialogFooter>
								<Button type={"submit"}>Create</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</section>
			<section className={"flex flex-wrap gap-4 p-4"}>
				{buckets.map((bucket) => {
					return (
						<Card className={"flex flex-col gap-2 items-start max-w-[300px]"} key={bucket.id}>
							<CardHeader className={"flex flex-row gap-2 items-center"}>
								<FolderTreeIcon />
								<Button type={"button"} variant={"link"}>
									<Link
										href={{
											pathname: `/dashboard/${bucket.name}`,
										}}
										className={"text-2xl"}>
										{bucket.name}
									</Link>
								</Button>
							</CardHeader>
							<CardFooter className={"flex flex-col gap-2 items-start"}>
								<CardDescription>Created: {showDate(bucket.createdAt)}</CardDescription>
								<CardDescription>Altered: {showDate(bucket.alteredAt)}</CardDescription>
							</CardFooter>
						</Card>
					);
				})}
			</section>
		</main>
	);
}
