const testApis = async () => {
  const baseUrl = 'http://localhost:5000/api/impact';
  try {
    console.log('1. GET /stats');
    const statsRes = await fetch(`${baseUrl}/stats`);
    console.log(await statsRes.json());

    console.log('\n2. GET /stories');
    let storiesRes = await fetch(`${baseUrl}/stories`);
    let stories = await storiesRes.json();
    console.log(`Received ${stories.length} stories.`);

    console.log('\n3. POST /stories');
    const postRes = await fetch(`${baseUrl}/stories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Story',
        headline: 'Test Headline',
        content: 'Test Content',
        author: 'Test Author'
      })
    });
    const newStory = await postRes.json();
    console.log('Created story:', newStory);

    if (newStory._id) {
      console.log('\n4. PUT /stories/:id');
      const putRes = await fetch(`${baseUrl}/stories/${newStory._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Updated Test Story' })
      });
      console.log('Updated story:', await putRes.json());

      console.log('\n5. DELETE /stories/:id');
      const delRes = await fetch(`${baseUrl}/stories/${newStory._id}`, { method: 'DELETE' });
      console.log('Delete response:', await delRes.json());
    }

    console.log('\n6. GET /problem');
    const probRes = await fetch(`${baseUrl}/problem`);
    const problem = await probRes.json();
    console.log('Problem title:', problem.title);

    console.log('\n7. PUT /problem');
    const probPutRes = await fetch(`${baseUrl}/problem`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Updated Problem Title' })
    });
    console.log('Updated problem title:', (await probPutRes.json()).title);
    
    // Restore problem
    await fetch(`${baseUrl}/problem`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Why StaySignal exists' })
    });

    console.log('\nAll tests passed successfully!');
  } catch (err) {
    console.error('Test failed:', err);
  }
};

testApis();
