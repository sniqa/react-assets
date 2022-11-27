import AddIcon from '@mui/icons-material/Add'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import UploadIcon from '@mui/icons-material/Upload'

export { AddIcon, AddCircleOutlineIcon, DeleteIcon, UploadIcon, ArrowBackIcon }

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUsb } from '@fortawesome/free-brands-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'
import {
	faBookOpen,
	faBuilding,
	faChartPie,
	faChevronLeft,
	faChevronRight,
	faCloud,
	faComputer,
	faDesktop,
	faDiagramProject,
	faDownload,
	faFileLines,
	faGlobe,
	faHardDrive,
	faHouse,
	faImages,
	faLaptopMedical,
	faMagnifyingGlass,
	faMessage,
	faNetworkWired,
	faPhone,
	faPrint,
	faServer,
	faTrash,
	faUser,
	faUserGear,
} from '@fortawesome/free-solid-svg-icons'

export const HomeIcon = () => <FontAwesomeIcon icon={faHouse} />

export const UserIcon = () => <FontAwesomeIcon icon={faUserGear} />

export const DepartmentIcon = () => <FontAwesomeIcon icon={faBuilding} />

export const AccountIcon = () => <FontAwesomeIcon icon={faUser} />

export const ProfileIcon = () => <FontAwesomeIcon icon={faBookOpen} />

export const DocumnetIcon = () => <FontAwesomeIcon icon={faFileLines} />

export const TopologyIcon = () => <FontAwesomeIcon icon={faImages} />

export const NetworkIcon = () => <FontAwesomeIcon icon={faNetworkWired} />

export const SummaryIcon = () => <FontAwesomeIcon icon={faChartPie} />

export const NetworkTypeIcon = () => <FontAwesomeIcon icon={faGlobe} />

export const IpAddressIcon = () => <FontAwesomeIcon icon={faDiagramProject} />

export const TelIcon = () => <FontAwesomeIcon icon={faPhone} />

export const DeviceIcon = () => <FontAwesomeIcon icon={faDesktop} />

export const ComputerIcon = () => <FontAwesomeIcon icon={faComputer} />

export const OfficeEquipmentIcon = () => <FontAwesomeIcon icon={faPrint} />

export const NetworkDeviceIcon = () => <FontAwesomeIcon icon={faServer} />

export const ServerIcon = () => <FontAwesomeIcon icon={faHardDrive} />

export const UsbKeyIcon = () => <FontAwesomeIcon icon={faUsb} />

export const MessageIcon = () => <FontAwesomeIcon icon={faMessage} />

export const TrashIcon = () => <FontAwesomeIcon icon={faTrash} />

// export const UploadIcon = () => <FontAwesomeIcon className="fa-solid fa-upload" />

export const DownloadIcon = () => <FontAwesomeIcon icon={faDownload} />

export const SearchIcon = () => <FontAwesomeIcon icon={faMagnifyingGlass} />

export const LeftArrowIcon = () => <FontAwesomeIcon icon={faChevronLeft} />

export const RightArrowIcon = () => <FontAwesomeIcon icon={faChevronRight} />

export const DeviceBaseIcon = () => <FontAwesomeIcon icon={faLaptopMedical} />

export const LinerIcon = () => <FontAwesomeIcon icon={faCloud} />
