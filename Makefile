SHELL := /bin/bash

decompress:
	@find $(REDDIT_SOURCE) -type f -name '*.bz2' -exec bzcat {} 2>/dev/null +

preprocess:
	@jq '"\(.id) \(if .score > $(SCORE_THRESHOLD) then "GOOD" else "BAD" end) \(.body)"' | tr -d '"'

segment:
	@head -$(TRAINING_N)

process:
	@$(MALLET_HOME)/bin/mallet import-file --input - --output -

train:
	@$(MALLET_HOME)/bin/mallet train-classifier --input - --output-classifier $(CLASSIFIER_OUT) --trainer $(TRAINER)

evaluate:
	@$(MALLET_HOME)/bin/mallet train-classifier --input - \
  	--trainer MaxEnt --trainer NaiveBayes \
  	--training-portion $(TRAINING_PORTION) --num-trials $(NUM_TRIALS)

classify:
	@$(MALLET_HOME)/bin/mallet classify-file --input - --output - --classifier $(CLASSIFIER_OUT)
