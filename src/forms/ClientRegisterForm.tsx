import { LoadingButton } from "@mui/lab";
import {
	IconButton,
	InputAdornment,
	Link,
	Stack,
	TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { FormikProps, useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import { object, ref, string } from "yup";
import Iconify from "../components/iconify";

type Props = {
	loginPath: string;
};

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const clientRegisterSchema = object({
	name: string().required("We need to call you something!"),
	email: string()
		.email("Please enter a valid email!")
		.required("Email is required!"),
	phone: string()
		.matches(phoneRegExp, "That doesn't look like a phone number")
		.required("Phone number is required!"),
	street: string().required("Street is required!"),
	city: string().required("City is required!"),
	province: string().required("Province is required!"),
	password: string().required("Password is required!"),
	confirmPassword: string()
		.required("Password is required!")
		.oneOf([ref("password")], "Your passwords do not match!"),
});

type clientRegistrationFields = {
	name: string;
	email: string;
	phone: string;
	street: string;
	city: string;
	province: string;
	password: string;
	confirmPassword: string;
};

type StepItem = {
	label: string;
	optional?: boolean;
	component: React.ReactNode;
	fields: (keyof clientRegistrationFields)[];
};

const Step1Component = ({
	formik,
}: {
	formik: FormikProps<clientRegistrationFields>;
}) => {
	return (
		<Stack spacing={3}>
			<TextField
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.name}
				error={formik.touched.name && !!formik.errors.name}
				helperText={formik.touched.name && formik.errors.name}
				placeholder="What's Your Name?"
				name="name"
				label="Name"
			/>
			<TextField
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.email}
				error={formik.touched.email && !!formik.errors.email}
				helperText={formik.touched.email && formik.errors.email}
				placeholder="How Can We Reach You?"
				name="email"
				label="Email address"
			/>
			<TextField
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.phone}
				error={formik.touched.phone && !!formik.errors.phone}
				helperText={formik.touched.phone && formik.errors.phone}
				placeholder="Ring, Ring!"
				name="phone"
				label="Phone number"
			/>
		</Stack>
	);
};

const Step2Component = ({
	formik,
}: {
	formik: FormikProps<clientRegistrationFields>;
}) => {
	return (
		<Stack spacing={3}>
			<TextField
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.street}
				error={formik.touched.street && !!formik.errors.street}
				helperText={formik.touched.street && formik.errors.street}
				placeholder="Where's Home?"
				name="street"
				label="Street"
			/>
			<TextField
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.province}
				error={formik.touched.province && !!formik.errors.province}
				helperText={formik.touched.province && formik.errors.province}
				placeholder="Which Province?"
				name="province"
				label="Province"
			/>
			<TextField
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.city}
				error={formik.touched.city && !!formik.errors.city}
				helperText={formik.touched.city && formik.errors.city}
				placeholder="Which Province?"
				name="city"
				label="City"
			/>
		</Stack>
	);
};

const Step3Component = ({
	formik,
}: {
	formik: FormikProps<clientRegistrationFields>;
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	return (
		<Stack spacing={3}>
			<TextField
				name="password"
				label="Password"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.password}
				error={formik.touched.password && !!formik.errors.password}
				helperText={formik.touched.password && formik.errors.password}
				type={showPassword ? "text" : "password"}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={() => setShowPassword(!showPassword)}
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
			<TextField
				name="confirmPassword"
				label="Confirm Password"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.confirmPassword}
				error={
					formik.touched.confirmPassword &&
					!!formik.errors.confirmPassword
				}
				helperText={
					formik.touched.password && formik.errors.confirmPassword
				}
				type={showConfirmPassword ? "text" : "password"}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={() =>
									setShowConfirmPassword(!showConfirmPassword)
								}
								edge="end"
							>
								<Iconify
									icon={
										showConfirmPassword
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
	);
};

const ClientRegisterForm = ({ loginPath }: Props) => {
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set<number>());
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			street: "",
			city: "",
			province: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: clientRegisterSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const validFieldArray = (array: (keyof clientRegistrationFields)[]) =>
		array.every((field) => !formik.errors[field] && formik.values[field]);

	const steps: StepItem[] = [
		{
			label: "Introduce yourself!",
			component: <Step1Component formik={formik} />,
			fields: ["name", "email", "phone"],
		},
		{
			label: "Where do you live?",
			component: <Step2Component formik={formik} />,
			fields: ["street", "city", "province"],
		},
		{
			label: "Secure your account",
			component: <Step3Component formik={formik} />,
			fields: ["password", "confirmPassword"],
		},
	];

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}
		if (activeStep === steps.length - 1) {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} else {
			if (validFieldArray(steps[activeStep].fields)) {
				setActiveStep((previousStep) => previousStep + 1);
			}
		}
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (steps[activeStep].optional) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((step, index) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: {
						optional?: React.ReactNode;
					} = {};
					if (steps[index].optional) {
						labelProps.optional = (
							<Typography variant="caption">Optional</Typography>
						);
					}
					if (isStepSkipped(index)) {
						stepProps.completed = false;
					}
					return (
						<Step key={step.label} {...stepProps}>
							<StepLabel {...labelProps}>{step.label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Box mt={5}>{steps[activeStep].component}</Box>
			{!loading && (
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{ my: 2 }}
				>
					<Typography variant="subtitle2">
						Already have an account?{" "}
						<Link href={loginPath} variant="subtitle2">
							Login here
						</Link>
					</Typography>
				</Stack>
			)}
			<Box sx={{ display: "flex", flexDirection: "row" }}>
				{!loading && (
					<Button
						color="inherit"
						disabled={activeStep === 0}
						onClick={handleBack}
						sx={{ mr: 1 }}
					>
						Back
					</Button>
				)}
				<Box sx={{ flex: "1 1 auto" }} />
				{steps[activeStep].optional && !loading && (
					<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
						Skip
					</Button>
				)}
				<LoadingButton
					disabled={!validFieldArray(steps[activeStep].fields)}
					loading={loading}
					onClick={handleNext}
				>
					{activeStep === steps.length - 1 ? "Finish" : "Next"}
				</LoadingButton>
			</Box>
		</Box>
	);
};

export default ClientRegisterForm;
