import { type ReactNode } from "react";
import { type Metadata } from "next";

import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme/provider/provider";
import { ThemeToggle } from "@/components/theme/toggle/toggle";

const font = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Media Storage",
	description: "Self hosted media storage",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ThemeProvider defaultTheme={"dark"} attribute={"class"}>
					{children}
					<div className={"absolute right-3 bottom-3"}>
						<ThemeToggle />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
