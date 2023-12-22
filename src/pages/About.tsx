import Header from '../components/Header';

const About = () => {
	return (
		<div>
			<Header />
			<div className='about'>
				<div className='about-intro'>
					<h2>
						The "generation effect" refers to a psychological phenomenon where
						actively creating or generating information, as opposed to passively
						consuming it, enhances learning and retention. It's a cognitive
						principle that highlights the idea that when individuals engage in
						the process of generating information, they are more likely to
						remember and understand it better.
					</h2>
				</div>
				<div className='how-it-works'>
					<h2>How it works:</h2>
					<ol>
						<li>
							<h4>Active Engagement:</h4>
							<p>
								Instead of simply reading or listening to information, the
								generation effect encourages individuals to actively engage with
								the material. This can involve tasks such as summarizing,
								explaining, or teaching the content to someone else.
							</p>
						</li>
						<li>
							<h4>Mental Processing:</h4>
							<p>
								When you actively generate information, your brain is forced to
								process and organize the material in a meaningful way. This
								deepens your understanding and memory of the subject matter.
							</p>
						</li>
						<li>
							<h4>Retrieval Practice: </h4>
							<p>
								Actively generating information requires you to retrieve it from
								your memory, reinforcing the neural pathways associated with
								that knowledge. This retrieval practice makes the information
								easier to recall in the future.
							</p>
						</li>
						<li>
							<h4>Enhanced Learning:</h4>
							<p>
								Studies have shown that actively generating information leads to
								improved learning outcomes compared to passive learning methods.
								It can boost memory retention, comprehension, and
								problem-solving abilities.
							</p>
						</li>
					</ol>
				</div>
				<div className='example'>
					<p>
						For example, if you're learning a new concept, instead of just
						reading about it, you could actively generate questions about the
						concept, write a summary, or explain it to someone else. This active
						involvement in the learning process can significantly enhance your
						grasp of the material.
					</p>
				</div>
				<div className='rules'>
					<h2>Rules:</h2>
					<ol>
						<li>
							<h4>Daily Goal:</h4>
							<p>Pick a daily goal.</p>
						</li>
						<li>
							<h4>Input:</h4>
							<p>Enter a sentence or paragraph.</p>
						</li>
						<li>
							<h4>Choose Difficulty:</h4>
							<p>Select easy, medium, or hard mode.</p>
						</li>
						<li>
							<h4>Generate:</h4>
							<p>
								Create a modified version of the text based on the chosen
								difficulty.
							</p>
						</li>
						<li>
							<h4>Practice:</h4>
							<p>Try to decipher and understand the modified text.</p>
						</li>
						<li>
							<h4>Guess Words:</h4>
							<p>
								Attempt to guess the number of words corresponding to your
								chosen daily goal.
							</p>
						</li>
					</ol>
				</div>
			</div>
		</div>
	);
};

export default About;
