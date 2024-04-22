import { useEffect } from "react";
// imported from firebase auth sdk
import { getAuth } from "firebase/auth";
// ensures compatibility with the older versions of firebase
import firebase from "firebase/compat/app";
// imports pre-built UI for firebase authentication
import * as firebaseui from "firebaseui";
// imports the firebaseui styles using the CDN
import "firebaseui/dist/firebaseui.css";
import { app } from "../firebase";
import React from "react";

export default function Login() {
	useEffect(() => {
		const ui =
			firebaseui.auth.AuthUI.getInstance() ||
			new firebaseui.auth.AuthUI(getAuth(app));

		ui.start("#firebaseui-auth-container", {
			signInSuccessUrl: "/CSCI2254GpProject",
			signInOptions: [
				{
					provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					clientId:
						"483149006038-s72i8lmq37u4iv7lcjpthnegh9am42u6.apps.googleusercontent.com",
				},
				{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
				},
				// Uncomment the following line for anonymous provider support
				// firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
			],
			credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
		});
	}, []);

	return <div id="firebaseui-auth-container"></div>;
}
