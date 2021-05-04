import { auth, provider } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import {
	setActiveUser,
	setUserLogoutState,
	selectUserEmail,
	selectUserName,
} from "./Redux/userSlice";
import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

function App() {
	console.log("1");
	const dispatch = useDispatch();
	const userName = useSelector(selectUserName);
	const userEmail = useSelector(selectUserEmail);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	console.log("2");
	useEffect(() => {
		console.log("3");
		setLoading(true);
		console.log("4");
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			console.log("0");
			if (authUser) {
				setUser(authUser);
				console.log("5");
				dispatch(
					setActiveUser({
						userName: authUser.displayName,
						userEmail: authUser.email,
					})
				);
				console.log("6");
				setLoading(false);
				console.log("7");
			} else {
				console.log("8");
				setUser(null);
				dispatch(setUserLogoutState());
				console.log("9");
				setLoading(false);
				console.log("10");
			}
		});

		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	console.log(userName, userEmail, user);
	console.log("11");

	console.log("12");
	const handelSignIn = () => {
		auth
			.signInWithPopup(provider)
			.then((user) => {
				dispatch(
					setActiveUser({
						userName: user.user.displayName,
						userEmail: user.user.email,
					})
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	console.log("13");
	const handelSignOut = () => {
		auth
			.signOut()
			.then(() => {
				dispatch(setUserLogoutState());
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="App">
			{console.log("14")}
			<Flex
				direction="column"
				height="100vh"
				alignItems="center"
				justifyContent="center"
			>
				{user ? (
					<>
						<Text
							bgGradient="linear(to-l, #7928CA,#FF0080)"
							bgClip="text"
							fontSize="6xl"
							fontWeight="extrabold"
						>
							Welcome {userName}
						</Text>
						<Button isLoading={loading} onClick={handelSignOut} margin="5px">
							Signout
						</Button>
					</>
				) : (
					<Button isLoading={loading} onClick={handelSignIn} margin="5px">
						Signin
					</Button>
				)}
			</Flex>
		</div>
	);
}

export default App;
