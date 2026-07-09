function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">

            <div className="max-w-7xl mx-auto px-8 py-12">

                <div className="grid grid-cols-3 gap-10">

                    <div>

                        <h2 className="text-2xl font-bold mb-4">
                            BookMyVenue
                        </h2>

                        <p className="text-gray-400">
                            Find the perfect venue for weddings,
                            corporate events and parties.
                        </p>

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-2 text-gray-400">

                            <li>Home</li>
                            <li>Venues</li>
                            <li>Login</li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold mb-4">
                            Contact
                        </h3>

                        <p className="text-gray-400">
                            support@bookmyvenue.com
                        </p>

                    </div>

                </div>

                <hr className="my-8 border-gray-700" />

                <div className="text-center text-gray-500">
                    © 2026 BookMyVenue. All rights reserved.
                </div>

            </div>

        </footer>
    );
}

export default Footer;