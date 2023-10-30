"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderPage from "./components/HeaderPage";
import "bootstrap/dist/css/bootstrap.css";
import CookieWarning from "./components/CookieWarning";

import { Provider } from "react-redux";

import store from "./redux/store/index";
const inter = Inter({ subsets: ["latin"] });
const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Provider store={store}>
			<html lang="en">
				<body className={inter.className}>
					<HeaderPage />
					<CookieWarning />
					{children}
				</body>
			</html>
		</Provider>
	);
}
