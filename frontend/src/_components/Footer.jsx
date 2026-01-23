import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-20">
      <div className="max-w-screen-xl mx-auto px-6">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          
          <div>
            <h2 className="text-xl font-semibold">AI Course Generator</h2>
            <p className="text-gray-400 mt-2 max-w-xs">
              Empowering personalized learning with AI-driven curriculum creation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-gray-300">Created by: <span className="font-medium">Swayam Pandey</span></p>
            <p className="text-gray-300">Email: <a href="mailto:swayampandey181@gmail.com" className="hover:underline">swayampandey181@gmail.com</a></p>
            <p className="text-gray-300">Phone: <a href="tel:+919305795070" className="hover:underline">9305795070</a></p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AI Course Generator — All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
