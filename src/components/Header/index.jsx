"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import { BsJournalArrowUp, BsJournalText } from "react-icons/bs";
import s from "./header.module.scss";

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedIsStaff = localStorage.getItem("is_staff");
    setIsAdmin(storedIsStaff === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_staff");
    router.push("/");
  };

  return (
    <header className={s.container}>
      <nav>
        {isAdmin ? (
          <div className={s.adminLinks}>
            <Link href="/create-post">
              <BsJournalArrowUp />
              Create Post
            </Link>
            <Link href="/posts">
              <BsJournalText/>
              Posts
            </Link>
            <button onClick={handleLogout} className={s.logoutButton}>
              <MdOutlineLogout />
              Logout
            </button>
          </div>
        ) : (
          <>
            <button onClick={handleLogout} className={s.logoutButton}>
              <MdOutlineLogout />
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
