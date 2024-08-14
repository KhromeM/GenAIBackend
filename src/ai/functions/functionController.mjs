import { getUserById, updateUser } from "../../db/dbUser.mjs";

export const executeLLMFunction = async (rspObj) => {
	try {
		const functionName = rspObj?.function?.toLowerCase();
		const params = rspObj.params;
		let user, appointment, response;

		switch (functionName) {
			case "LLMDisplayInformation".toLowerCase():
				return params.response;
			case "LLMDidNotUnderstand".toLowerCase():
				return {
					function: functionName,
					response: params.response,
					success: false,
				};
			case "LLMCannotDo".toLowerCase():
				return {
					function: functionName,
					response: params.response,
					success: false,
				};
			case "LLMUpdateUserName".toLowerCase():
				user = await getUserById(params.userId);
				user.name = params.newName;
				await updateUser(user);
				response =
					params.response ||
					`Your name has been successfully updated to ${params.newName}!`;
				break;

			case "LLMUpdateUserPhone".toLowerCase():
				user = await getUserById(params.userId);
				user.phone = params.newPhoneNumber;
				await updateUser(user);
				response =
					params.response ||
					`Your phone number has been successfully updated to ${params.newPhoneNumber}!`;
				break;

			case "LLMUpdateUserAddress".toLowerCase():
				user = await getUserById(params.userId);
				user.address = params.newAddress;
				await updateUser(user);
				response =
					params.response ||
					`Your address has been successfully updated to ${params.newAddress}!`;
				break;

			case "LLMUpdateUserEmail".toLowerCase():
				user = await getUserById(params.userId);
				user.email = params.newEmail;
				await updateUser(user);
				response =
					params.response ||
					`Your email has been successfully updated to ${params.newEmail}!`;
				break;

			case "LLMUpdateUserLanguagePreference".toLowerCase():
				user = await getUserById(params.userId);
				user.language = params.language;
				await updateUser(user);
				response =
					params.response ||
					`Your language preference has been successfully updated to ${params.language}!`;
				break;

			default:
				throw new Error(`Function ${functionName} not found`);
		}

		return { function: functionName, response, success: true };
	} catch (err) {
		console.log(`Error in LLM function calling:`, err);
		console.log("Response that caused an error: ", JSON.stringify(rspObj));
		return {
			function: "unknown",
			response: "Sorry, something went wrong! 😬",
			success: false,
		};
	}
};
