import EmailIcon from "../assets/logo/envelope.svg";
import FacebookIcon from "../assets/logo/facebook.svg";
import InstagramIcon from "../assets/logo/instagram.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 px-4 sm:px-8">
      <div className="w-full max-w-[56.25rem] mx-auto">
        <div className="hidden sm:flex justify-between items-center">
          <div className="text-base text-gray-50 whitespace-nowrap leading-[1.625rem] font-normal">
            ©codeit - 2025
          </div>

          <div className="flex gap-3 text-base text-gray-50 leading-[1.625rem] font-normal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/faq">FAQ</a>
          </div>

          <div className="flex gap-3">
            <a href="https://mail.google.com" className="cursor-pointer">
              <img
                src={EmailIcon}
                alt="Email"
                className="w-[1.5rem] h-[1.5rem]"
              />
            </a>
            <a href="https//www.facebook.com" className="cursor-pointer">
              <img
                src={FacebookIcon}
                alt="Facebook"
                className="w-[1.5rem] h-[1.5rem]"
              />
            </a>
            <a href="https://www.instagram.com" className="cursor-pointer">
              <img
                src={InstagramIcon}
                alt="Instagram"
                className="w-[1.5rem] h-[1.5rem]"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:hidden mt-4">
          <div className="flex flex-wrap gap-4 text-sm justify-between">
            <div className="flex flex-wrap gap-6 text-sm font-normal leading-[1.375rem] text-gray-50">
              <a href="/privacy">Privacy Policy</a>
              <a href="/faq">FAQ</a>
            </div>
            <div className="flex flex-wrap gap-2.5 text-sm justify-between">
              <a href="https://mail.google.com" className="cursor-pointer">
                <img
                  src={EmailIcon}
                  alt="Email"
                  className="w-[1.5rem] h-[1.5rem]"
                />
              </a>
              <a href="https//www.facebook.com" className="cursor-pointer">
                <img
                  src={FacebookIcon}
                  alt="Facebook"
                  className="w-[1.5rem] h-[1.5rem]"
                />
              </a>
              <a href="https://www.instagram.com" className="cursor-pointer">
                <img
                  src={InstagramIcon}
                  alt="Instagram"
                  className="w-[1.5rem] h-[1.5rem]"
                />
              </a>
            </div>
          </div>

          <div className="text-xs text-gray-50 leading-[1rem] font-normal pt-[1rem]">
            ©codeit - 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
