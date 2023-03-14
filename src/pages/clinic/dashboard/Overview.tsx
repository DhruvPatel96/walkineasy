import React from "react";
import { Container, Card, CardContent, Typography } from "@mui/material";

interface CardProps {
	title: string;
	content: string;
}

const CardComponent: React.FC<CardProps> = ({ title, content }) => {
	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="h2">
					{title}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{content}
				</Typography>
			</CardContent>
		</Card>
	);
};

const Overview: React.FC = () => {
	return (
		<Container>
			<CardComponent
				title="Card 1"
				content="This is the content for Card 1"
			/>
			<CardComponent
				title="Card 2"
				content="This is the content for Card 2"
			/>
			<CardComponent
				title="Card 3"
				content="This is the content for Card 3"
			/>
		</Container>
	);
};

export default Overview;
