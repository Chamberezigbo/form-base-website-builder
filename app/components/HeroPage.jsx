import Link from "next/link";
const HeroPage = () => {
	return (
		<>
			<section className="container pt-5">
				<div className="row h-100 mt-md-5 pt-md-5 mx-auto">
					<div className="col-sm-12 col-md-8 pt-md-5 mt-md-5">
						{/* Content for the first section */}
						<h1 className="text-color fw-bolder fw-md-normal mb-2 custom-font">
							Make a website <br />
							in minute
						</h1>
						<h5 className="text-color mb-2">
							Get your business online quickly <br /> Build your
							brand all free of charge <br /> zero code or design
							skill needed
						</h5>
						<div className="position-relative">
							<img
								src="Vector2.png"
								alt=""
								className="img-fluid position-absolute top-0 start-0 mt-4 ms-3 d-none d-sm-block"
							/>

							<Link
								href="../business-signup/"
								className="btn btn-primary ms-md-5 mt-3"
								type="button"
							>
								Get Started
							</Link>
						</div>
					</div>
					<div className="col-4 mt-md-0 mt-5 ms-5 ps-4 ps-md-0 ms-md-0">
						{/* Content for the second section */}
						<div className="position-relative w-100 h-100">
							<img
								src="hero.png"
								className="image-fluid"
								alt=""
							/>

							<img
								src="Vector1.png"
								alt=""
								className="img-fluid position-absolute top-100 end-25 translate-middle img-sm"
							/>
							<img
								src="Vector.png"
								alt=""
								className="img-fluid position-absolute top-50 start-0 translate-middle"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default HeroPage;
