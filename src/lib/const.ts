type IFlag = {
	code: 'fr' | 'en';
	country: string;
	svg: string;
	box: number;
};

export const FLAGS: IFlag[] = [
	{
		code: 'fr',
		country: 'france',
		svg: '<g><path d="M170.667 423.721H8.828A8.829 8.829 0 0 1 0 414.893V97.1a8.829 8.829 0 0 1 8.828-8.828h161.839v335.449z" style="" fill="#41479b" data-original="#41479b" class=""></path><path d="M170.67 88.277h170.67v335.45H170.67z" style="" fill="#f5f5f5" data-original="#f5f5f5" class=""></path><path d="M503.172 423.721H341.333V88.273h161.839A8.829 8.829 0 0 1 512 97.101v317.793a8.827 8.827 0 0 1-8.828 8.827z" style="" fill="#ff4b55" data-original="#ff4b55" class=""></path></g>',
		box: 512
	},
	{
		code: 'en',
		country: 'luxembourg',
		svg: '<g><path d="M0 85.333h512V426.67H0z" style="" fill="#f0f0f0" data-original="#f0f0f0" class=""></path><path d="M288 85.33h-64v138.666H0v64h224v138.666h64V287.996h224v-64H288z" style="" fill="#d80027" data-original="#d80027" class=""></path><path d="M393.785 315.358 512 381.034v-65.676zM311.652 315.358 512 426.662v-31.474l-143.693-79.83zM458.634 426.662l-146.982-81.664v81.664z" style="" fill="#41479b" data-original="#41479b" class=""></path><path d="M311.652 315.358 512 426.662v-31.474l-143.693-79.83z" style="" fill="#f0f0f0" data-original="#f0f0f0" class=""></path><path d="M311.652 315.358 512 426.662v-31.474l-143.693-79.83z" style="" fill="#d80027" data-original="#d80027" class=""></path><path d="M90.341 315.356 0 365.546v-50.19zM200.348 329.51v97.151H25.491z" style="" fill="#41479b" data-original="#41479b" class=""></path><path d="M143.693 315.358 0 395.188v31.474l200.348-111.304z" style="" fill="#d80027" data-original="#d80027" class=""></path><path d="M118.215 196.634 0 130.958v65.676zM200.348 196.634 0 85.33v31.474l143.693 79.83zM53.366 85.33l146.982 81.664V85.33z" style="" fill="#41479b" data-original="#41479b" class=""></path><path d="M200.348 196.634 0 85.33v31.474l143.693 79.83z" style="" fill="#f0f0f0" data-original="#f0f0f0" class=""></path><path d="M200.348 196.634 0 85.33v31.474l143.693 79.83z" style="" fill="#d80027" data-original="#d80027" class=""></path><path d="M421.659 196.636 512 146.446v50.19zM311.652 182.482V85.331h174.857z" style="" fill="#41479b" data-original="#41479b" class=""></path><path d="M368.307 196.634 512 116.804V85.33L311.652 196.634z" style="" fill="#d80027" data-original="#d80027" class=""></path></g>',
		box: 512
	}
];
