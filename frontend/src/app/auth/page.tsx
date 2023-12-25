import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LockIcon, MailIcon } from "lucide-react";

export default function page() {
	return (
		<form
			className={"flex flex-1 items-center justify-center"}
			action={async () => {
				"use server";
			}}>
			<Card>
				<CardHeader>
					<CardTitle>Authorization</CardTitle>
					<CardDescription>You sure you have access to this page?</CardDescription>
				</CardHeader>
				<CardContent className={"flex flex-col gap-2"}>
					<div className={"flex items-center relative"}>
						<Input
							name={"email"}
							id={"email"}
							type={"email"}
							placeholder={"email@example.com"}
							className={"pr-10"}
							required={true}
						/>
						<MailIcon className={"absolute right-2"} />
					</div>
					<div className={"flex items-center relative"}>
						<Input
							name={"password"}
							id={"password"}
							type={"password"}
							placeholder={"Secret phrase"}
							className={"pr-10"}
							required={true}
						/>
						<LockIcon className={"absolute right-2"} />
					</div>
				</CardContent>
				<CardFooter className={"w-full"}>
					<Button type={"submit"} className={"w-full"}>
						xCellence
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
