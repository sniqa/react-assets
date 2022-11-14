import { Path, PathMap } from '@/path_map'
import RouteMenu, { RouteMenuProps } from '@comps/RouteMenu'
import {
  HomeIcon,
  UserIcon,
  IpAddressIcon,
  UsbKeyIcon,
  DepartmentIcon,
  DeviceIcon,
  DocumnetIcon,
  TelIcon,
  TopologyIcon,
  ProfileIcon,
  NetworkDeviceIcon,
  NetworkIcon,
  NetworkTypeIcon,
  MessageIcon,
  AccountIcon,
  SummaryIcon,
  ComputerIcon,
  OfficeEquipmentIcon,
  ServerIcon,
  DeviceBaseIcon,
  LinerIcon,
} from '@assets/Icons'
import { useLocation } from 'react-router-dom'

const routeMenus: RouteMenuProps[] = [
  // 主页
  {
    title: PathMap.Home,
    to: Path.Home,
    icon: <HomeIcon />,
  },

  // 用户
  {
    title: PathMap.User,
    icon: <UserIcon />,
    subRouteMenus: [
      {
        title: PathMap.Department,
        to: Path.Department,
        icon: <DepartmentIcon />,
      },
      {
        title: PathMap.Account,
        to: Path.Account,
        icon: <AccountIcon />,
      },
    ],
  },

  // 资料
  {
    title: PathMap.Profile,
    // to: Path.Profile,
    icon: <ProfileIcon />,
    subRouteMenus: [
      {
        title: PathMap.Document,
        to: Path.Document,
        icon: <DocumnetIcon />,
      },
      {
        title: '拓扑图',
        to: Path.Topology,
        icon: <TopologyIcon />,
      },
    ],
  },

  // 网络
  {
    title: PathMap.Network,
    icon: <NetworkIcon />,
    subRouteMenus: [
      {
        title: PathMap.Network_summary,
        to: Path.Network_summary,
        icon: <SummaryIcon />,
      },
      {
        title: PathMap.Network_type,
        to: Path.Network_type,
        icon: <NetworkTypeIcon />,
      },
      {
        title: PathMap.Ip_address,
        to: Path.Ip_address,
        icon: <IpAddressIcon />,
      },
      {
        title: PathMap.Tel,
        to: Path.Tel,
        icon: <TelIcon />,
      },
      {
        title: PathMap.Liner,
        to: Path.Liner,
        icon: <LinerIcon />,
      },
    ],
  },

  // 设备
  {
    title: PathMap.Device,
    icon: <DeviceIcon />,
    subRouteMenus: [
      {
        title: PathMap.Device_summary,
        to: Path.Device_summary,
        icon: <SummaryIcon />,
      },
      {
        title: PathMap.Computer,
        to: Path.Computer,
        icon: <ComputerIcon />,
      },
      {
        title: PathMap.Office_equipment,
        to: Path.Office_equipment,
        icon: <OfficeEquipmentIcon />,
      },
      {
        title: PathMap.Network_device,
        to: Path.Network_device,
        icon: <NetworkDeviceIcon />,
      },
      {
        title: PathMap.Server,
        to: Path.Server,
        icon: <ServerIcon />,
      },
      {
        title: PathMap.Usb_key,
        to: Path.Usb_key,
        icon: <UsbKeyIcon />,
      },
      {
        title: PathMap.Device_base,
        to: Path.Device_base,
        icon: <DeviceBaseIcon />,
      },
    ],
  },

  // 消息
  {
    title: PathMap.Message,
    to: Path.Message,
    icon: <MessageIcon />,
  },
]

const LeftAside = () => {
  const location = useLocation().pathname

  return (
    <div className="flex h-screen flex-col justify-between border-r bg-white">
      <div className="px-4 py-6">
        <nav className="flex flex-col">
          {routeMenus.map((routeMenu) => (
            <RouteMenu
              key={routeMenu.title}
              title={routeMenu.title}
              icon={routeMenu.icon}
              to={routeMenu.to}
              subRouteMenus={routeMenu.subRouteMenus}
              open={routeMenu.subRouteMenus?.some(
                (subRouteMenu) => subRouteMenu.to === location
              )}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default LeftAside
