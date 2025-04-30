import EmailIcon from "../assets/logo/envelope.svg";
import FacebookIcon from "../assets/logo/facebook.svg";
import InstagramIcon from "../assets/logo/instagram.svg";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-10 py-6 px-4 gap-2">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between text-gray-50 text-base">
        <span>©codeit - 2023</span>

        <div className="flex gap-6">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/faq" className="hover:underline">
            FAQ
          </a>
        </div>

        <div className="flex gap-4">
          <img src={EmailIcon} alt="email" className="w-5 h-5" />
          <a href="https://www.facebook.com/">
            <img src={FacebookIcon} alt="facebook" className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/">
            <img src={InstagramIcon} alt="instagram" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
