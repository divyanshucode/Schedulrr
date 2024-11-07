"use client";

import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesGantt } from 'lucide-react';
import React from 'react'

const Usermenu = () => {
  return (
    <UserButton appearance={{
        elements:{
            avatarBox:"w-10 h-10",
        }
    }} >
        {/*MenuItems is a component from Clerk that allows you to add items to the user menu*/}
          <UserButton.MenuItems>
              <UserButton.Link
                  label='My Events'
                  labelIcon={<ChartNoAxesGantt size={15} />}
                  href='/events'
              />
              <UserButton.Action label='manageAccount' />
          </UserButton.MenuItems>
      </UserButton>
  )
}

export default Usermenu