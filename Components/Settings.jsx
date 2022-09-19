const { React } = require('powercord/webpack')
const { SwitchItem } = require('powercord/components/settings')

module.exports = class Settings extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { getSetting, toggleSetting } = this.props
		return (
			<div>
				<SwitchItem
					value={getSetting('caps', false)}
					onChange={() => {
						toggleSetting('caps')
					}}
					note='Capitalize every letter before creating the image'>
					Force Capitals
                </SwitchItem>
			</div>
		);
	}
}
