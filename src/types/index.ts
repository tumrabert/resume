export interface IProfileResp {
	intro: IIntro;
	projects: IProject[];
	technologies: ITechnology[];
	certificates:ICertificate[];
	workExperiences: IWorkExperience[];
	educations: IEducation[];
	interests: IInterests[];
	resumeUrl: {
		sourceLink: string;
		fullVersionLink: string;
	};
}
export interface IInterests {
	title: string;
	details: string[];
}
export interface IIntro {
	name: string;
	nickname: string;
	phone: string;
	email: string;
	github: string;
	linkedin: string;
	location: string;
	website: string;
}

export interface IProject {
	name: string;
	details: string[];
	url: string[];
	hide: boolean;
}

export interface ITechnology {
	section: string;
	details: string[];
}

export interface IWorkExperience {
	position: string;
	company: string;
	url: string;
	years: string[];
	details: string[];
}

export interface IEducation {
	head: string;
	details: string;
	years: string[];
	GPA: string;
}
export interface ICertificate {
	title: string;
	description: string;
	url: string;
}
