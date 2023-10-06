import Link from "next/link";

export default function HeaderPage() {
	return (
		<header>
			<nav className="navbar navbar-light bg-lighter">
				<div className="container">
					<Link className="navbar-brand" href="/">
						<img
							src="/Tekprenuers.png"
							alt=""
							width="110"
							height="30"
						/>
					</Link>
				</div>
			</nav>
		</header>
	);
}
