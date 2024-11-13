import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen lg:grid lg:grid-cols-12 gap-6 p-6 lg:p-24">
            {/* Left Section */}
            <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start space-y-12 lg:space-y-20 text-center lg:text-left">
                {/* Logo and Title */}
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold">
                        <span className="text-red-300">Quick</span> Post
                    </h1>
                </div>

                {/* Main Text */}
                <div className="space-y-5 text-gray-400 text-xl lg:text-2xl font-semibold">
                    <h1>FOLLOW <span className="font-normal text-base lg:text-xs">PEOPLE AROUND THE GLOBE</span></h1>
                    <h1>CONNECT <span className="font-normal text-base lg:text-xs">WITH YOUR FRIENDS</span></h1>
                    <h1>SHARE <span className="font-normal text-base lg:text-xs">WHAT YOU'RE THINKING</span></h1>
                </div>

                {/* Call to Action */}
                <div className="space-y-2 w-full lg:w-auto flex flex-col items-center lg:items-start">
                    <Link to={"/signup"} className="bg-red-500 text-white w-full lg:w-auto px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300">
                        Join Now
                    </Link>
                    <p className="text-red-500">Already have an account? <Link className="text-blue-400 underline" to={"/login"}>Login In</Link> </p>
                </div>
            </div>

            {/* Right Section (Hero Image) */}
            <div className="col-span-12 lg:col-span-6 hidden lg:flex items-center justify-center">
                {/* Placeholder for the Hero Image */}
                <div className="w-full h-full flex items-center justify-center">
                    <img src="https://cdn6.aptoide.com/imgs/5/e/d/5ed59c348256cd47c1f244b680229be4_icon.png" alt="quickpost" />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
