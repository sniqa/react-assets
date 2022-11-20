export enum Path {
	Root = '/',

	Home = '/home',

	User = '/user',
	Department = '/user/department',
	Account = '/user/account',

	Profile = '/profile',
	Document = '/profile/document',
	DocumentDetail = '/profile/document/:id',
	DocumentCreate = '/profile/document/create',
	Topology = '/profile/topology',
	TopologyDetail = '/profile/topology/:id',
	TopologyCreate = '/profile/topology/create',

	Network = '/network',
	Network_summary = '/network/network_summary',
	Network_type = '/network/network_type',
	Ip_address = '/network/ip_address',
	Tel = '/network/tel',
	Liner = '/network/liner',

	Device = '/device',
	Device_base = '/device/device_base',
	Device_summary = '/device/device_summary',
	Computer = '/device/computer',
	Office_equipment = '/device/office_equipment',
	Network_device = '/device/network_device',
	Server = '/device/server',
	Usb_key = '/device/usb_key',

	Message = '/message',
}

// export enum pathMap {
// 	home= '主页',

// 	user= '用户',
// 	department= '部门',
// 	account= '账户',

// 	network= '网络',
// 	network_type= '网络类型',
// 	ip_address= 'ip地址总览',
// 	tel= '电话',

// 	device = '设备',
// 	computer = '计算机',
// 	office_equipment = '办公设备',
// 	network_device = '网络设备',
// 	server = '服务器',
// 	usb_key = '数字证书',
// }

export const PathMap = {
	Home: '主页',

	User: '用户',
	Department: '部门',
	Account: '账户',

	Profile: '资料',
	Document: '文档',
	Topology: '拓扑图',
	Topology_create: '创建拓扑图',

	Network: '网络',
	Network_summary: '网络概览',
	Network_type: '网络类型',
	Ip_address: 'ip地址',
	Tel: '电话',
	Liner: '专线',

	Device: '设备',
	Device_base: '设备基础资料',
	Device_summary: '设备概览',
	Computer: '计算机',
	Office_equipment: '办公设备',
	Network_device: '网络设备',
	Server: '服务器',
	Usb_key: '数字证书',

	Message: '消息',
}

export const getPathMap = (path: string) => {
	const target = path.split('/').pop()

	const res = Object.entries(PathMap).find(
		(pathMap) => pathMap[0].toLowerCase() === target
	)

	return res ? res[1] : ''
}
