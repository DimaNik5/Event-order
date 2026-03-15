import type { IconName } from "./type";

import {ArrowIcon} from "./arrow.js"
import {BellIcon} from "./bell.js"
import {CalendarIcon} from "./calendar.js"
import {CheckmarkIcon} from "./checkmark.js"
import {CommentIcon} from "./comment.js"
import {EditIcon} from "./edit.js"
import {EmailIcon} from "./email.js"
import {ExitIcon} from "./exit.js"
import {FilterIcon} from "./filter.js"
import {GarbageIcon} from "./garbage.js"
import {LogoIcon} from "./logo.js"
import {PasswordIcon} from "./password.js"
import {PenIcon} from "./pen.js"
import {PhoneIcon} from "./phone.js"
import {PlusIcon} from "./plus.js"
import {RhombIcon} from "./rhomb.js"
import {TGIcon} from "./tg.js"
import {UserIcon} from "./user.js"

export const IconElements: Record<IconName, React.ReactElement> = {
    "arrow": <ArrowIcon height="100%" width="100%" color='var(--info-color)'/>,
    "bell": <BellIcon height="100%" width="100%" color='var(--info-color)'/>,
    "calendar": <CalendarIcon height="100%" width="100%" color='var(--info-color)'/>,
    "checkmark": <CheckmarkIcon height="100%" width="100%" color='var(--info-color)'/>,
    "comment": <CommentIcon height="100%" width="100%" color='var(--info-color)'/>,
    "edit": <EditIcon height="100%" width="100%" color='var(--info-color)'/>,
    "email": <EmailIcon height="100%" width="100%" color='var(--info-color)'/>,
    "exit": <ExitIcon height="100%" width="100%" color='var(--info-color)'/>,
    "filter": <FilterIcon height="100%" width="100%" color='var(--info-color)'/>,
    "garbage": <GarbageIcon height="100%" width="100%" color='var(--info-color)'/>,
    "logo": <LogoIcon height="100%" width="100%" color='var(--info-color)'/>,
    "password": <PasswordIcon height="100%" width="100%" color='var(--info-color)'/>,
    "pen": <PenIcon height="100%" width="100%" color='var(--info-color)'/>,
    "phone": <PhoneIcon height="100%" width="100%" color='var(--info-color)'/>,
    "plus": <PlusIcon height="100%" width="100%" color='var(--info-color)'/>,
    "rhomb": <RhombIcon height="100%" width="100%" color='var(--info-color)'/>,
    "tg": <TGIcon height="100%" width="100%" color='var(--info-color)'/>,
    "user": <UserIcon height="100%" width="100%" color='var(--info-color)'/>
};