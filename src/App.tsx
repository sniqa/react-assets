import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { lazy } from 'react'
import PageLayout from '@comps/PageLayout'
import IndexPage from '@views/Index'
import LeftAside from '@comps/LeftAside'
import SuspenseState from '@comps/SuspenseState'
import _404 from '@views/_404'
import { Path } from '@path'

const HomePage = lazy(() => import('@views/Home'))

const DeviceSummaryPage = lazy(() => import('@views/device/Summary'))
const ComputerPage = lazy(() => import('@views/device/Computer'))
const NetworkDevicePage = lazy(() => import('@views/device/NetworkDevice'))
const OfficeEuuipmentPage = lazy(() => import('@views/device/OfficeEquipment'))
const ServerPage = lazy(() => import('@views/device/Server'))
const UsbKeyPage = lazy(() => import('@views/device/UsbKey'))
//
const NetworkSummaryPage = lazy(() => import('@views/network/Summary'))
const NetworkTypePage = lazy(() => import('@views/network/NetworkType'))
const IpAddressPage = lazy(() => import('@views/network/IpAddress'))
const TelPage = lazy(() => import('@views/network/Tel'))

const DocumentPage = lazy(() => import('@views/profile/Document'))
const TopologyPage = lazy(() => import('@views/profile/Topology'))
const TopologyDetailPage = lazy(() => import('@views/profile/TopologyDetail'))

const DepartmentPage = lazy(() => import('@views/user/Department'))
const AccountPage = lazy(() => import('@views/user/Account'))
// const HomePage = lazy(() => import('@views/user/UsbKey'))

const MessagePage = lazy(() => import('@views/message/Message'))

function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />}></Route>
      <Route
        path={Path.Root}
        element={
          <PageLayout leftAside={<LeftAside />}>
            <SuspenseState>
              <Outlet />
            </SuspenseState>
          </PageLayout>
        }
      >
        <Route path={Path.Home} element={<HomePage />} />

        {/* user */}
        <Route path={Path.Department} element={<DepartmentPage />} />
        <Route path={Path.Account} element={<AccountPage />} />

        {/* profile */}
        <Route path={Path.Document} element={<DocumentPage />} />
        <Route path={Path.Topology} element={<TopologyPage />} />
        <Route path={Path.TopologyDetail} element={<TopologyDetailPage />} />

        {/* network */}
        <Route path={Path.Network_summary} element={<NetworkSummaryPage />} />
        <Route path={Path.Network_type} element={<NetworkTypePage />} />
        <Route path={Path.Ip_address} element={<IpAddressPage />} />
        <Route path={Path.Tel} element={<TelPage />} />

        {/* device */}
        <Route path={Path.Device_summary} element={<DeviceSummaryPage />} />
        <Route path={Path.Computer} element={<ComputerPage />} />
        <Route path={Path.Network_device} element={<NetworkDevicePage />} />
        <Route path={Path.Office_equipment} element={<OfficeEuuipmentPage />} />
        <Route path={Path.Server} element={<ServerPage />} />
        <Route path={Path.Usb_key} element={<UsbKeyPage />} />

        {/* message */}
        <Route path={Path.Message} element={<MessagePage />} />
      </Route>

      <Route path="*" element={<_404 />} />
    </Routes>
  )
}

export default App
