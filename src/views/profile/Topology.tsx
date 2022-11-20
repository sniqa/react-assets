import ProfileCard from '@/views/profile/ProfileCard'
import { SearchIcon } from '@assets/Icons'
import { IconButton, InputBase, Stack } from '@mui/material'
import { Path } from '@path'
import { Link } from 'react-router-dom'

const Topology = () => {
	return (
		<>
			<div className="flex justify-between items-center border-b h-12 shadow-md px-2">
				<section>
					<Link
						to={Path.TopologyCreate}
						className={`text-sm text-blue-600`}
					>{`新建`}</Link>
				</section>

				<section className="border rounded pl-2 flex items-center">
					<InputBase size={`small`} type={`search`} />
					<IconButton size={`small`}>
						<SearchIcon />
					</IconButton>
				</section>
			</div>

			<Stack flexWrap={`wrap`} className={``} direction="row">
				<ProfileCard
					to={'hello'}
					title={'hello'}
					description="实验室设备资产管理方案主要由UHF无源标签、有源智能感应标签、UHF固定式读写器、有源固定式读写器、桌面发卡器、PDA以及实验室管理系统等组成，实现实验室设备资产的出入库、使用、借调、折旧、维修、报废、盘点、定位等日常化智能管理。"
					create_timestamp={0}
					last_modify_timestamp={0}
				/>
				<ProfileCard
					to={'hello'}
					title={'hello'}
					description="实验室设备资产管理方案主要由UHF无源标签、有源智能感应标签、UHF固定式读写器、有源固定式读写器、桌面发卡器、PDA以及实验室管理系统等组成，实现实验室设备资产的出入库、使用、借调、折旧、维修、报废、盘点、定位等日常化智能管理。"
					create_timestamp={0}
					last_modify_timestamp={0}
				/>{' '}
				<ProfileCard
					to={'hello'}
					title={'hello'}
					description="实验室设备资产管理方案主要由UHF无源标签、有源智能感应标签、UHF固定式读写器、有源固定式读写器、桌面发卡器、PDA以及实验室管理系统等组成，实现实验室设备资产的出入库、使用、借调、折旧、维修、报废、盘点、定位等日常化智能管理。"
					create_timestamp={0}
					last_modify_timestamp={0}
				/>{' '}
				<ProfileCard
					to={'hello'}
					title={'hello'}
					description="实验室设备资产管理方案主要由UHF无源标签、有源智能感应标签、UHF固定式读写器、有源固定式读写器、桌面发卡器、PDA以及实验室管理系统等组成，实现实验室设备资产的出入库、使用、借调、折旧、维修、报废、盘点、定位等日常化智能管理。"
					create_timestamp={0}
					last_modify_timestamp={0}
				/>{' '}
				<ProfileCard
					to={'hello'}
					title={'hello'}
					description="实验室设备资产管理方案主要由UHF无源标签、有源智能感应标签、UHF固定式读写器、有源固定式读写器、桌面发卡器、PDA以及实验室管理系统等组成，实现实验室设备资产的出入库、使用、借调、折旧、维修、报废、盘点、定位等日常化智能管理。"
					create_timestamp={0}
					last_modify_timestamp={0}
				/>
			</Stack>
		</>
	)
}

export default Topology
