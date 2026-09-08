import type { IconName } from "./type";

import {ArrowIcon} from "./arrow"
import {BellIcon} from "./bell"
import {CalendarIcon} from "./calendar"
import {CheckmarkIcon} from "./checkmark"
import {CommentIcon} from "./comment"
import {EditIcon} from "./edit"
import {EmailIcon} from "./email"
import {ExitIcon} from "./exit"
import {FilterIcon} from "./filter"
import {GarbageIcon} from "./garbage"
import {LogoIcon} from "./logo"
import {PasswordIcon} from "./password"
import {PenIcon} from "./pen"
import {PhoneIcon} from "./phone"
import {PlusIcon} from "./plus"
import {RhombIcon} from "./rhomb"
import {TGIcon} from "./tg"
import {UserIcon} from "./user"
import {LensIcon} from "./lens"
import {EyeIcon} from "./eye"
import {SaveIcon} from "./save"
import { PointsIcon } from "./points";
import { PhotoIcon } from "./photo";
import { SunIcon } from "./sun";

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
    "user": <UserIcon height="100%" width="100%" color='var(--info-color)'/>,
    "lens": <LensIcon height="100%" width="100%" color='var(--info-color)'/>,
    "eye": <EyeIcon height="100%" width="100%" color='var(--info-color)'/>,
    "save": <SaveIcon height="100%" width="100%" color='var(--info-color)'/>,
    "points": <PointsIcon height="100%" width="100%" color='var(--info-color)'/>,
    "sun": <SunIcon height="100%" width="100%" color='var(--info-color)'/>,
    "photo": <PhotoIcon height="100%" width="100%" color='var(--info-color)'/>,
};