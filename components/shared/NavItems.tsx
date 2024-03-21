"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SheetClose } from "../ui/sheet";

const NavItems = ({ withSheetClose }: { withSheetClose?: boolean }) => {
  const pathName = usePathname();
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}];

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathName === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <SheetCloseWrapper {...sheetCloseWrapperProps} key={link.label}>
              <Link href={link.route}>{link.label}</Link>
            </SheetCloseWrapper>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
