
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image: "/images/tom.jpg",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    image: "/images/emma.jpg",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    image: "/images/will.jpg",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
];

export const Team = () => {
  return (
    <>

<div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-6"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-72 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.role}</p>
            <div className="flex space-x-4 mt-3">
              {member.twitter && (
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-gray-500 hover:text-blue-500 text-lg" />
                </a>
              )}
              {member.instagram && (
                <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-gray-500 hover:text-pink-500 text-lg" />
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-gray-500 hover:text-blue-700 text-lg" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
