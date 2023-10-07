import torch.nn as nn

class DeepSeq2SeqRNN(nn.Module):
    def __init__(self, input_dim, output_dim, hidden_dim):
        super(DeepSeq2SeqRNN, self).__init__()

        # Encoder
        self.encoder_rnn1 = nn.RNN(input_dim, hidden_dim, batch_first=True)
        self.encoder_rnn2 = nn.RNN(hidden_dim, hidden_dim, batch_first=True)
        
        self.enc2dec = nn.Linear(hidden_dim, output_dim)  # Adjusted from input_dim to hidden_dim
        
        # Decoder
        self.decoder_rnn1 = nn.RNN(output_dim, hidden_dim, batch_first=True)
        self.decoder_rnn2 = nn.RNN(hidden_dim, hidden_dim, batch_first=True)
        self.decoder_fc1 = nn.Linear(hidden_dim, hidden_dim)
        self.decoder_fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, source, target_len):
        # Encoding
        x, hidden = self.encoder_rnn1(source)
        x, _ = self.encoder_rnn2(x)

        # Use the last output of the encoder as the first input to the decoder
        dec_input = self.enc2dec(x[:, -1, :]).unsqueeze(1)
        
        outputs = []

        for t in range(target_len):
            x, hidden = self.decoder_rnn1(dec_input, hidden)
            x, hidden = self.decoder_rnn2(x)
            dec_output = self.decoder_fc2(self.decoder_fc1(x))
            outputs.append(dec_output)

            dec_input = dec_output

        return torch.cat(outputs, dim=1)
