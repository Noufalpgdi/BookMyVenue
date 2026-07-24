function AuthLayout({ children, buttonText, onButtonClick }) {
    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-b from-teal-600 to-blue-900 text-white flex-col justify-center items-center p-10">

                <h1 className="text-5xl font-bold mb-8">
                    BookMyVenue
                </h1>

                <p className="text-lg text-center mb-10 leading-8">
                    Discover the perfect venue for every occasion.
                    <br />
                    From weddings and conferences to parties and corporate events,
                    BookMyVenue makes booking simple.
                </p>

                <button
                    type="button"
                    onClick={onButtonClick}
                    className="bg-white text-blue-800 px-10 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                >
                    {buttonText}
                </button>

            </div>

            {/* Right Panel */}
            <div className="flex-1 flex justify-center overflow-y-auto py-8 px-6">
                {children}
            </div>

        </div>
    );
}

export default AuthLayout;