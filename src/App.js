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
require("dotenv").config();

function App() {
	const dispatch = useDispatch();
	const userName = useSelector(selectUserName);
	const userEmail = useSelector(selectUserEmail);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser);

				dispatch(
					setActiveUser({
						userName: authUser.displayName,
						userEmail: authUser.email,
					})
				);

				setLoading(false);
			} else {
				setUser(null);
				dispatch(setUserLogoutState());

				setLoading(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [dispatch]);

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
