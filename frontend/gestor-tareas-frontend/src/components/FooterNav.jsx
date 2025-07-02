import { FiLinkedin, FiYoutube } from "react-icons/fi";
import { IconBrandLinktree } from "@tabler/icons-react"; // usa Tabler Icons (pueden instalarse con react-icons o tabler)

export default function FooterNav() {
  const iconClass = "text-white text-2xl hover:text-gray-300";

  return (
    <nav className="bg-[#0e0533] fixed inset-x-0 bottom-0 border-t shadow-inner">
      <div className="max-w-2xl mx-auto grid grid-cols-3 py-3">
        <a
          href="https://www.linkedin.com/in/sion-maldonado"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
          aria-label="LinkedIn"
        >
          <FiLinkedin className={iconClass} />
        </a>

        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
          aria-label="YouTube"
        >
          <FiYoutube className={iconClass} />
        </a>

        <a
          href="https://linktr.ee/speedle"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
          aria-label="Linktr.ee"
        >
          <IconBrandLinktree className={iconClass} />
        </a>
      </div>
    </nav>
  );
}
