import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {clearMails, setMailIndex, setSpamScore} from "../store/mailboxReducer";
import MailContent from "../components/MailContent";
import {Body, fetch} from "@tauri-apps/api/http";

class Mailbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: "HTML",
			index: 0,
		}
	}
	
	render() {
		if (this.props.mails.length === 0)
			return (<div className="flex flex-col justify-center items-center h-full w-full text-lg text-gray-700">
				<div>
					<svg className="w-20 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
						<path className="opacity-40" d="M432 64H144a144 144 0 0 1 144 144v208a32 32 0 0 1-32 32h288a32 32 0 0 0 32-32V208A144 144 0 0 0 432 64zm80 208a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-48h-56a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h104a16 16 0 0 1 16 16z"/>
						<path d="M143.93 64C64.2 64 0 129.65 0 209.38V416a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32V208A144 144 0 0 0 143.93 64zM224 240a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16zm272-48H392a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h56v48a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16z"/>
					</svg>
				</div>
				<div className="font-semibold text-gray-500 mb-2">No mail to show!</div>
				<div className="text-sm text-gray-400">Send emails using this smtp server: <br/>127.0.0.1:25</div>
			</div>)
		
		return (
			<div className="flex h-full">
				<div className="h-full flex-shrink-0 w-52 lg:w-80 xl:w-96 border-r border-gray-300 ">
					{this.props.mails.map(mail => {
						return <Fragment key={mail.key}>
							<div className={`border-b border-gray-400 border-opacity-70 flex items-center py-2 hover:bg-gray-300 hover:bg-opacity-40 cursor-pointer select-none px-2 ${mail.key === this.props.mailIndex ? 'bg-gray-300 bg-opacity-60' : ''}`}
							     onClick={() => this.selectMail(mail)}>
								{mail.seen === false && <div className="bg-green-500 h-2 w-2 flex-shrink-0 rounded-full mr-2"></div>}
								<div className="w-full py-1">
									<div className="flex items-center">
										<div className={`truncate text-xs text-gray-600 ${mail.seen === false && 'font-semibold'}`}>{mail.subject}</div>
									</div>
									<div className="text-xs text-gray-500">{mail.to}</div>
								</div>
								<div className="flex-shrink-0 ml-2">
									<svg className="w-3 h-3 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
										<path d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"/>
									</svg>
								</div>
							</div>
						</Fragment>
					})}
				</div>
				{this.props.mailIndex !== null ? <div className="h-full bg-gray-50 w-full px-2 pb-3 overflow-y-auto">
					<div className="text-xl py-2 text-gray-800">{this.props.mail.subject || 'subject'}</div>
					<div className="text-sm">
						From : {this.props.mail.from || 'from'} <br/>
						To : {this.props.mail.to || 'to'} <br/>
						Message-ID : {this.props.mail.message_id || 'message_id'} <br/>
					</div>
					<div className="flex border-t pt-1.5 mt-1 mb-2">
						{(this.props.mail.html === "" ? ["Text", "Raw", "Headers", "Spam Reports"] : ["HTML", "HTML-Source", "Text", "Raw", "Headers", "Spam Reports"]).map(item => {
							return <div key={item} className={`py-1 mr-0.5 px-2 text-sm cursor-pointer select-none whitespace-nowrap ${this.state.tab === item ? 'bg-gray-600 rounded-full text-white' : ''}`} onClick={e => this.setState({tab: item})}>{item}</div>
						})}
					</div>
					<div className={`bg-white rounded-md border `}>
						<MailContent tab={this.state.tab} mail={this.props.mail}/>
					</div>
				</div> : <div className="h-full bg-gray-50 w-full px-2 pb-3 overflow-y-auto flex flex-col justify-center items-center w-full text-lg text-gray-700">
					<div>
						<svg className="w-20 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
							<path className="opacity-40" d="M432 64H144a144 144 0 0 1 144 144v208a32 32 0 0 1-32 32h288a32 32 0 0 0 32-32V208A144 144 0 0 0 432 64zm80 208a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-48h-56a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h104a16 16 0 0 1 16 16z"/>
							<path d="M143.93 64C64.2 64 0 129.65 0 209.38V416a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32V208A144 144 0 0 0 143.93 64zM224 240a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16zm272-48H392a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h56v48a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16z"/>
						</svg>
					</div>
					<div className="font-semibold text-gray-500">Select a mail!</div>
				</div>}
			
			</div>
		);
	}
	
	
	selectMail(mail) {
		this.props.setMailIndex(mail.key)
		this.setState({tab: mail.html === "" ? 'Text' : 'HTML'});
		if (mail.spam_score === "") {
			fetch("https://spamcheck.postmarkapp.com/filter", {
				method: "POST",
				responseType: 1,
				mode: 'no-cors',
				body: Body.json({email: mail.mime.toString(), options: "long"}),
				headers: {"Accept": "application/json", "Content-Type": "application/json"}
			}).then(res => {
				console.log(res)
				this.props.setSpamScore({
					key: mail.key,
					spam_score: res.data.score,
					spam_rules: res.data.rules,
				});
			}).catch(err => console.log(err))
		}
	}
}

export default withRouter(connect(
	state => ({
		mails: state.mailbox.mails,
		mailIndex: state.mailbox.mailIndex,
		mail: state.mailbox.mail,
	}),
	{
		clearMails,
		setMailIndex,
		setSpamScore,
		
	}
)(Mailbox));
