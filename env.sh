export MALLET_HOME=../mallet				#Where Mallet is located
export REDDIT_SOURCE=$PWD				#Root of reddit comments
export SCORE_THRESHOLD=1				#more than this is "GOOD", else "BAD"
export TRAINING_N=1000					#Number of samples
export TRAINER=MaxEnt					#MaxEnt/NaiveBayes
export CLASSIFIER_OUT=training/default.classifier	#Loction of classifer file
export NUM_TRIALS=10					#Number of trials for evaluation
export TRAINING_PORTION=0.9				#Split for evaluation
