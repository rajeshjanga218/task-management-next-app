const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center text-gray-400">
        <p>2024 MyWebsite. All rights reserved.</p>
        <p>
          <span className="hover:text-white dark:text-red-900">
            Privacy Policy
          </span>{" "}
          | <span className="hover:text-white">Terms of Service</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
