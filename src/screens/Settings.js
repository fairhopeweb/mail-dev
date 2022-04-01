import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {setForwardEmailEnc, setForwardEmailHost, setForwardEmailPassword, setForwardEmailPort, setForwardEmailUsername, setForwardEnabled, setFramework, setIpAddress, setPort, setSrvStatus} from "../store/settingReducer";
import {invoke} from "@tauri-apps/api";

class Settings extends Component {
	constructor(props) {
		super(props);
		this.startServer = this.startServer.bind(this);
	}
	
	render() {
		return (
			<div className="h-full w-full text-lg text-gray-700 py-4 px-6 scroll overflow-y-auto">
				<h3 className="mb-2">Settings</h3>
				
				<div className="bg-white rounded-md px-4 py-2 border mb-2">
					<h3 className="font-semibold mb-2">SMTP configuration</h3>
					<div className={`relative flex pb-2 ${this.props.srvStatus === true ? 'opacity-60' : ''}`}>
						{this.props.srvStatus === true && <div className="absolute w-full h-full bg-white opacity-10 z-40"></div>}
						<div className="mr-3 w-64">
							<label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700">IP Address</label>
							<div className="mt-1">
								<input defaultValue={this.props.ipAddress} onChange={e => this.props.setIpAddress(e.target.value)} type="text" name="ipAddress" id="ipAddress" className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 focus:ring-opacity-40 focus:ring-2 rounded-md"/>
							</div>
						</div>
						<div className="mr-3 w-32">
							<label htmlFor="port" className="block text-sm font-medium text-gray-700">Port</label>
							<div className="mt-1">
								<input defaultValue={this.props.port} onChange={e => this.props.setPort(parseInt(e.target.value, 10))} type="text" name="port" id="port" className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 focus:ring-opacity-40 focus:ring-2 rounded-md"/>
							</div>
						</div>
						<div>
							<label htmlFor="port" className="block text-sm font-medium text-gray-700"> &nbsp; </label>
							<div className="mt-1">
								<button onClick={this.startServer}
								        type="button" className={`inline-flex items-center px-3 py-2.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-green-500 hover:bg-green-600 ${this.props.srvStatus === true && 'opacity-80'}`}>
									Start Server
								</button>
							</div>
						</div>
					
					
					</div>
				</div>
				
				<div className="bg-white rounded-md px-4 py-2 border mb-2">
					<h3 className="font-semibold mb-2">Forward emails</h3>
					<div className="relative flex pb-2">
						<div className="mr-3 w-64">
							<label htmlFor="forwardEmailHost" className="block text-sm font-medium text-gray-700">Host</label>
							<div className="mt-1">
								<input type="text" onChange={e => this.props.setForwardEmailHost(e.target.value)} defaultValue={this.props.forwardEmailHost} autoComplete="none" autoCorrect="none" name="forwardEmailHost" id="forwardEmailHost" className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 focus:ring-opacity-40 focus:ring-2 rounded-md"/>
							</div>
						</div>
						
						<div className="mr-3 w-32">
							<label htmlFor="forwardEmailPort" className="block text-sm font-medium text-gray-700">Port</label>
							<div className="mt-1">
								<input type="text" onChange={e => this.props.setForwardEmailPort(e.target.value)} defaultValue={this.props.forwardEmailPort} autoComplete="none" autoCorrect="none" name="forwardEmailPort" id="forwardEmailPort" className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 focus:ring-opacity-40 focus:ring-2 rounded-md"/>
							</div>
						</div>
						
						<div className="mr-3 w-32">
							<label htmlFor="forwardEmailEnc" className="block text-sm font-medium text-gray-700">Encryption</label>
							<div className="mt-1">
								<select onChange={e => this.props.setForwardEmailEnc(e.target.value)} defaultValue={this.props.forwardEmailEnc} name="forwardEmailEnc" id="forwardEmailEnc" className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 focus:ring-opacity-40 focus:ring-2 rounded-md">
									<option value="">None</option>
									<option value="ssl">SSL</option>
									<option value="tls">TLS</option>
								</select>
							</div>
						
						</div>
					</div>
					
					<div className="relative flex pb-2">
						
						<div className="mr-3 w-44">
							<label htmlFor="forwardEmailUsername" className="block text-sm font-medium text-gray-700">Username</label>
							<div className="mt-1">
								<input type="text" onChange={e => this.props.setForwardEmailUsername(e.target.value)} defaultValue={this.props.forwardEmailUsername} autoComplete={false} autoCorrect={false} name="forwardEmailUsername" id="forwardEmailUsername" className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 focus:ring-opacity-40 focus:ring-2 rounded-md"/>
							</div>
						</div>
						
						<div className="mr-3 w-44">
							<label htmlFor="forwardEmailPassword" className="block text-sm font-medium text-gray-700">Password</label>
							<div className="mt-1">
								<input type="text" onFocus={e => e.target.setAttribute('type', 'text')} onBlur={e => e.target.setAttribute('type', 'password')} onChange={e => this.props.setForwardEmailPassword(e.target.value)} defaultValue={this.props.forwardEmailPassword} autoComplete={false} autoCorrect={false} name="forwardEmailPassword" id="forwardEmailPassword" className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 focus:ring-opacity-40 focus:ring-2 rounded-md"/>
							</div>
						</div>
						
						<div>
							<label htmlFor="save" className="block text-sm font-medium text-gray-700"> &nbsp; </label>
							<div className="mt-1">
								<button
									onClick={() => this.props.setForwardEnabled(!this.props.forwardEnabled)}
									type="button" className={`inline-flex items-center px-3 py-2.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${this.props.forwardEnabled === true ? 'bg-red-500 hover:bg-red-600' : ' bg-green-500 hover:bg-green-600'}`}>
									{this.props.forwardEnabled === true ? 'Disable Forwarding' : 'Enable Forwarding'}
								</button>
							</div>
						</div>
					
					</div>
				</div>
				
				<div className="bg-white rounded-md px-4 py-2 border mb-4">
					<div className="">
						<h3 className="font-semibold mb-2">Framework configuration</h3>
						<select onChange={e => this.props.setFramework(e.target.value)} defaultValue={this.props.framework}
						        className="mt-1 block w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:ring-opacity-40 sm:text-sm rounded-md">
							<option>Laravel</option>
							<option>Symfony</option>
							<option>WordPress</option>
							<option>Yii Framework</option>
							<option>Nodemailer</option>
							<option>Ruby on Rails</option>
							<option>Ruby (net/smtp)</option>
						</select>
					</div>
					
					<p className="py-2 text-sm text-gray-600 border-b-2 border-dashed">
						If you are using Vagrant/Homestead, use <span className="font-semibold font-mono">"10.0.2.2"</span> as your SMTP-Host.<br/>
						For Docker, use <span className="font-semibold font-mono">"host.docker.internal"</span> as your SMTP-Host.
					</p>
					
					{this.props.framework === 'Laravel' && <div className="whitespace-pre-wrap text-sm text-gray-600">
						<p className="py-2 text-sm text-gray-600">
							Use these configuration values in your Laravel applications .env file:
						</p>
						
						<h4 className="py-1 font-semibold">For Laravel 7+:</h4>
						<code className="font-mono mb-2 block bg-gray-900 shadow-inner rounded-md p-2 text-gray-300">
							{`MAIL_MAILER=smtp\nMAIL_HOST=${this.props.ipAddress}\nMAIL_PORT=${this.props.port}\nMAIL_USERNAME=null\nMAIL_PASSWORD=null\nMAIL_ENCRYPTION=null`}
						</code>
						
						<h4 className="py-1 font-semibold">For Laravel 6 and below:</h4>
						<code className="font-mono mb-2 block bg-gray-900 shadow-inner rounded-md p-2 text-gray-300">
							{`MAIL_DRIVER=smtp\nMAIL_HOST=${this.props.ipAddress}\nMAIL_PORT=${this.props.port}\nMAIL_USERNAME=null\nMAIL_PASSWORD=null\nMAIL_ENCRYPTION=null`}
						</code>
					</div>}
					
					{this.props.framework === 'Symfony' && <div className="whitespace-pre-wrap text-sm text-gray-600">
						<p className="py-2 text-sm text-gray-600">
							Symfony uses SwiftMailerBundle to send emails. You can find more information on how to send email on. <br/>
							To get started you need to modify .env file in your project directory and set MAILER_URL value:
						</p>
						
						<code className="font-mono mb-2 block bg-gray-900 shadow-inner rounded-md p-2 text-gray-300">
							{`MAILER_URL=smtp://${this.props.ipAddress}:${this.props.port}?encryption=null&auth_mode=null`}
						</code>
					
					
					</div>}
					
					{this.props.framework === 'WordPress' && <div className="whitespace-pre-wrap text-sm text-gray-600">
						<p className="py-2 text-sm text-gray-600">
							You can configure your WordPress site to send mails to Mail-Dev by using :
						</p>
						
						<code className="font-mono mb-2 block bg-gray-900 shadow-inner rounded-md p-2 text-gray-300">
							{`function mail_dev($phpmailer) {\n\t$phpmailer->isSMTP();\n\t$phpmailer->Host = '${this.props.ipAddress}';\n\t$phpmailer->SMTPAuth = false;\n\t$phpmailer->Port = ${this.props.port};\n}\n\nadd_action('phpmailer_init', 'mail_dev');`}
						</code>
					</div>}
					
					{this.props.framework === 'Yii Framework' && <div className="whitespace-pre-wrap text-sm text-gray-600">
						<p className="py-2 text-sm text-gray-600">
							You can find documentation for sending emails using SMTP in Yii Framework here. <br/>
							In your config file add:
						</p>
						
						<code className="font-mono mb-2 block bg-gray-900 shadow-inner rounded-md p-2 text-gray-300">
							{`'components' => [\n\t'mailer' => [\n\t\t'class' => 'yii\\swiftmailer\\Mailer',\n\t\t'enableSwiftMailerLogging' => true,\n\t\t'transport' => [\n\t\t\t'class' => 'Swift_SmtpTransport',\n\t\t\t"host" => '${this.props.ipAddress}',\n\t\t\t"port" => ${this.props.port},\n\t\t],\n\t],\n],`}
						</code>
					
					</div>}
					
					{this.props.framework === 'Nodemailer' && <div className="whitespace-pre-wrap text-sm text-gray-600">
						<p className="py-2 text-sm text-gray-600">
							Nodemailer is an easy to use module to send e-mails with Node.JS:<br/>
						</p>
						
						<code className="font-mono mb-2 block bg-gray-900 shadow-inner rounded-md p-2 text-gray-300">
							{`let transport = nodemailer.createTransport({\n\thost: "${this.props.ipAddress}",\n\tport: ${this.props.port},\n});`}
						</code>
					</div>}
					
					{this.props.framework === 'Ruby on Rails' && <div className="whitespace-pre-wrap text-sm text-gray-600">
						<p className="py-2 text-sm text-gray-600">
							In config/environments/*.rb specify ActionMailer defaults for your development or staging servers:
						</p>
						
						<code className="font-mono mb-2 block bg-gray-900 shadow-inner rounded-md p-2 text-gray-300">
							{`config.action_mailer.delivery_method = :smtp \nconfig.action_mailer.smtp_settings = {\n\t:address => '${this.props.ipAddress}',\n\t:domain => '${this.props.ipAddress}',\n\t:port => '${this.props.port}',\n}`}
						</code>
					
					</div>}
					
					{this.props.framework === 'Ruby (net/smtp)' && <div className="whitespace-pre-wrap text-sm text-gray-600">
						<p className="py-2 text-sm text-gray-600">
							Sending email using net/smtp from Ruby stdlib:
						</p>
						
						<code className="font-mono mb-2 block bg-gray-900 shadow-inner rounded-md p-2 text-gray-300">
							{`require 'net/smtp'\n\nmessage = <<-END.split("\n").map!(&:strip).join("\n")\nFrom: Private Person <from@${this.props.ipAddress}>\nTo: A Test User <to@${this.props.ipAddress}>\nSubject: MAIL-DEV!\n\nThis is a test e-mail message from MAIL-DEV.\nEND\n\nNet::SMTP.start('${this.props.ipAddress}',\n              ${this.props.port},\n              '${this.props.ipAddress}') do |smtp|\nsmtp.send_message message, 'from@${this.props.ipAddress}',\n                           'to@${this.props.ipAddress}'\nend`}
						</code>
					
					</div>}
				
				</div>
			
			</div>
		);
	}
	
	
	startServer() {
		invoke("start_smtp_server", {address: `${this.props.ipAddress}:${this.props.port}`}).then().catch()
		this.props.setSrvStatus(true)
	}
	
}

export default withRouter(connect(
	state => ({
		srvStatus: state.setting.srvStatus,
		framework: state.setting.framework,
		ipAddress: state.setting.ipAddress,
		port: state.setting.port,
		
		forwardEmailHost: state.setting.forwardEmailHost,
		forwardEmailPort: state.setting.forwardEmailPort,
		forwardEmailEnc: state.setting.forwardEmailEnc,
		forwardEmailUsername: state.setting.forwardEmailUsername,
		forwardEmailPassword: state.setting.forwardEmailPassword,
		forwardEnabled: state.setting.forwardEnabled,
		
	}),
	{
		setSrvStatus,
		setIpAddress,
		setPort,
		setFramework,
		setForwardEmailHost,
		setForwardEmailPort,
		setForwardEmailEnc,
		setForwardEmailUsername,
		setForwardEmailPassword,
		setForwardEnabled,
	}
)(Settings));
