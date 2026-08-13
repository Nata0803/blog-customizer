import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [formData, setFormData] = useState(defaultArticleState);

	const toggleForm = () => {
		setIsOpen((state) => !state);
	};

	const handleFormReset = () => {
		setFormData(defaultArticleState);
	};

	const handleFormSubmit = (data: typeof defaultArticleState) => {
		setFormData(data);
		toggleForm();
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formData.fontFamilyOption.value,
					'--font-size': formData.fontSizeOption.value,
					'--font-color': formData.fontColor.value,
					'--container-width': formData.contentWidth.value,
					'--bg-color': formData.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				data={formData}
				onToggle={toggleForm}
				onSubmit={handleFormSubmit}
				onReset={handleFormReset}
			/>
			<Article />
		</main>
	);
};
