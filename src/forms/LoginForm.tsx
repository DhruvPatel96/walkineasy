import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { LoadingButton } from "@mui/lab";
import {
	IconButton,
	InputAdornment,
	Link,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import { useFormik } from "formik";
import { object, string } from "yup";

// ----------------------------------------------------------------------

type Props = {
	registerPath: string;
	forgotPath: string;
};

const loginSchema = object({
	email: string()
		.email("Please enter a valid email!")
		.required("Email is required!"),
	password: string().required("Password is required!"),
});

export const LoginForm = ({ registerPath, forgotPath }: Props) => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const handleClick = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 10000);
	};

	return (
		<>
			<Stack spacing={3}>
				<TextField
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					error={formik.touched.email && !!formik.errors.email}
					helperText={
						formik.touched.email && !!formik.errors.email
							? formik.errors.email
							: ""
					}
					name="email"
					label="Email address"
				/>

				<TextField
					name="password"
					label="Password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
					error={formik.touched.password && !!formik.errors.password}
					helperText={
						formik.touched.password && !!formik.errors.password
							? formik.errors.password
							: ""
					}
					type={showPassword ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() =>
										setShowPassword(!showPassword)
									}
									edge="end"
								>
									<Iconify
										icon={
											showPassword
												? "eva:eye-fill"
												: "eva:eye-off-fill"
										}
									/>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				sx={{ my: 2 }}
			>
				<Typography variant="subtitle2">
					Don’t have an account? {""}
					<Link href={registerPath} variant="subtitle2">
						Get started
					</Link>
				</Typography>
				<Link href={forgotPath} variant="subtitle2">
					Forgot password?
				</Link>
			</Stack>

			<LoadingButton
				fullWidth
				size="large"
				type="submit"
				loading={loading}
				variant="contained"
				onClick={handleClick}
			>
				Login
			</LoadingButton>
		</>
	);
};
