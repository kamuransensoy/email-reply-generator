console.log("Email Writer Extension - Content Script Loaded");

function createAIButton() {
    const button = document.createElement('button');
    button.textContent = 'Generate Another Reply';
    button.className = 'ai-fancy-button';
    return button;
  }
  
  function createSummarizeButton() {
    const button = document.createElement('button');
    button.textContent = 'Summarize Thread';
    button.className = 'ai-fancy-button';
    return button;
  }

function getFullThreadText() {
    const threadBlocks = document.querySelectorAll('.a3s'); // All visible email bodies
    let fullThread = '';
    threadBlocks.forEach(block => {
      fullThread += block.innerText.trim() + '\n\n';
    });
    return fullThread;
  }
  
function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
        return null;
    }
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) return;
  
    const toolbar = findComposeToolbar();
    if (!toolbar) {
      console.log("Toolbar not found");
      return;
    }
  
    const button = createAIButton();
    const toneDropdown = createToneDropdown();
    const summarizeButton = createSummarizeButton();
  
    button.classList.add('ai-reply-button');
    summarizeButton.classList.add('summarize-thread-button');
  
    // ✅ Button click logic
    button.addEventListener('click', async () => {
      const tone = toneDropdown.value || 'friendly';
      const fullText = getFullThreadText();
      try {
        button.innerHTML = 'Thinking...';
  
        const response = await fetch('http://localhost:8080/api/email/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailContent: fullText, tone })
        });
  
        if (!response.ok) throw new Error('AI reply failed');
        const replyText = await response.text();
  
        const editableDivs = document.querySelectorAll('.editable[contenteditable="true"]');
        const lastEditable = editableDivs[editableDivs.length - 1];
  
        if (lastEditable) {
          lastEditable.focus();
          lastEditable.innerText = replyText;
        } else {
          alert("Reply box not found.");
        }
      } catch (err) {
        console.error(err);
        alert('❌ AI Reply failed.');
      } finally {
        button.innerHTML = 'Generate Another Reply';
      }
    });
  
    // ✅ Summarize logic (unchanged)
    summarizeButton.addEventListener('click', async () => {
      const fullText = getFullThreadText();
      try {
        summarizeButton.innerHTML = 'Summarizing...';
        const response = await fetch('http://localhost:8080/api/email/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailContent: fullText })
        });
        if (!response.ok) throw new Error('Summarization failed');
        const summary = await response.text();
        alert('🧠 Summary:\n\n' + summary);
      } catch (err) {
        console.error(err);
        alert('Failed to summarize thread.');
      } finally {
        summarizeButton.innerHTML = 'Summarize Thread';
      }
    });
  
    // ✅ Inject into toolbar
    toolbar.insertBefore(summarizeButton, toolbar.firstChild);
    toolbar.insertBefore(button, toolbar.firstChild);
    toolbar.insertBefore(toneDropdown, toolbar.firstChild);
  }
  

  function createToneDropdown() {
    const toneSelect = document.createElement('select');
    toneSelect.classList.add('ai-tone-selector', 'ai-select');
    toneSelect.style.marginRight = '8px';
    toneSelect.style.padding = '6px';
    toneSelect.style.borderRadius = '4px';
    toneSelect.style.border = '1px solid #ccc';
    toneSelect.style.fontSize = '14px';
  
    const tones = [
      { label: 'Select Tone', value: '' },
      { label: 'Professional', value: 'professional' },
      { label: 'Casual', value: 'casual' },
      { label: 'Friendly', value: 'friendly' },
      { label: 'Polite', value: 'polite' },
      { label: 'Empathetic', value: 'empathetic' },
      { label: 'Cheerful', value: 'cheerful' },
      { label: 'Apologetic', value: 'apologetic' },
      { label: 'Assertive', value: 'assertive' }
    ];
  
    tones.forEach(tone => {
      const option = document.createElement('option');
      option.value = tone.value;
      option.text = tone.label;
      toneSelect.appendChild(option);
    });
  
    return toneSelect;
  }
  

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hasComposeElements) {
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});


observer.observe(document.body, {
    childList: true,
    subtree: true
});